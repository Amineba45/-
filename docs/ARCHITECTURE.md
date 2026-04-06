# Samba Service - Architecture

## Vue d'ensemble

Samba Service est une plateforme e-commerce multi-magasins construite avec une architecture moderne séparée en trois couches : frontend, backend API, et base de données.

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                      │
│              Next.js 14 (App Router)                    │
│         TypeScript + Tailwind CSS + Redux               │
└─────────────────────────┬───────────────────────────────┘
                          │ HTTPS/REST API
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   BACKEND API                           │
│              Node.js 18 + Express.js                    │
│          JWT Auth + Rate Limiting + CORS                │
└─────────────────────────┬───────────────────────────────┘
                          │ Mongoose ODM
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   DATABASE                              │
│                  MongoDB Atlas                          │
│        Collections: users, stores, products,            │
│               orders, categories                        │
└─────────────────────────────────────────────────────────┘
```

## Architecture Frontend

### App Router (Next.js 14)
```
app/
├── (auth)/          # Routes d'authentification
│   ├── login/       # Page de connexion
│   └── register/    # Page d'inscription
├── (customer)/      # Espace client
│   ├── dashboard/   # Tableau de bord client
│   ├── stores/      # Liste des magasins
│   ├── cart/        # Panier
│   ├── checkout/    # Commande
│   └── orders/      # Historique commandes
├── (admin)/         # Espace admin magasin
│   ├── dashboard/   # Tableau de bord admin
│   ├── products/    # Gestion produits
│   ├── orders/      # Gestion commandes
│   ├── inventory/   # Gestion stock
│   └── analytics/   # Statistiques
└── (superadmin)/    # Espace super admin
    ├── dashboard/   # Vue globale
    ├── stores-management/
    ├── users-management/
    └── reports/
```

### State Management (Redux Toolkit)
```
store/
├── auth/     # Authentification (user, token)
├── cart/     # Panier (items, storeId)
└── stores/   # Magasins (liste, sélection)
```

## Architecture Backend

### Pattern MVC + Services
```
src/
├── config/       # Configuration (DB, env)
├── models/       # Schémas Mongoose
├── controllers/  # Handlers HTTP
├── routes/       # Définition des routes
├── middleware/   # Auth, validation, erreurs
├── services/     # Logique métier réutilisable
└── utils/        # Helpers, constantes
```

### Flux d'une requête
```
Request → Route → Middleware → Controller → Service → Model → DB
                                    ↓
Response ← JSON ← Controller ← Service ← Model ← DB
```

## Modèles de données

### Relations
```
User (1) ─────────────── (N) Order
User (1) ─────────────── (1) Store (store_admin)
Store (1) ──────────────(N) Category
Store (1) ──────────────(N) Product
Store (1) ──────────────(N) Order
Category (1) ───────────(N) Product
Order (1) ──────────────(N) OrderItem → Product
```

## Sécurité

- **Authentification**: JWT + Refresh Tokens (7j/30j)
- **Hashage**: bcrypt (12 rounds)
- **Rate Limiting**: 100 req/15min par IP
- **CORS**: Origines autorisées configurables
- **Helmet**: Headers HTTP sécurisés
- **Validation**: express-validator côté backend + Zod côté frontend

## Géolocalisation

L'algorithme de distance utilise la formule de Haversine :
```
d = 2R × arcsin(√(sin²(Δlat/2) + cos(lat1) × cos(lat2) × sin²(Δlon/2)))
```

Les magasins sont filtrés par rayon de livraison par rapport à la position GPS du client.

## Système de paiement

```
Client → Sélection méthode → Backend → API paiement
                                  ↓
Webhook ← Confirmation ← API Orange Money / Wave
    ↓
Update Order (paymentStatus: 'completed')
```

## Déploiement recommandé

- **Frontend**: Vercel (edge network, déploiement automatique)
- **Backend**: Railway ou Render (Node.js hosting)
- **Database**: MongoDB Atlas (M0 gratuit → M10 production)
- **Images**: Cloudinary (CDN + transformations)
- **Email**: SendGrid (transactionnel)
