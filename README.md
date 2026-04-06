# 🛒 Samba Service

**Plateforme e-commerce multi-magasins pour les supermarchés de Dakar**

Samba Service permet aux supermarchés de Dakar de créer et gérer leurs boutiques en ligne, offrant aux clients une expérience d'achat simplifiée avec livraison à domicile et géolocalisation GPS.

## 🏪 Magasins partenaires

- **SAMBA BA - Keur Massar** - À côté du pont, devant la pharmacie
- **SAMBA BA - Almadies 2** - Almadies 2, Dakar
- **Supérette Rahmatoulah** - Devant la Gendarmerie du Keur Massar
- **SUPERETTE ISB SAMBA BA** - Route du Tivaouane Peulh, devant l'église

## 🏗️ Architecture

```
samba-service/
├── frontend/          # Next.js 14 + TypeScript + Tailwind CSS
├── backend/           # Node.js + Express + MongoDB
├── docs/              # Documentation API, Setup, Architecture
└── docker-compose.yml # Configuration Docker
```

## ⚡ Démarrage rapide

### Option 1: Docker (Recommandé)
```bash
cp backend/.env.example backend/.env
# Editer backend/.env avec vos valeurs
docker-compose up -d
```

### Option 2: Manuel

**Backend:**
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

## 🌐 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000/api/v1 |
| Health Check | http://localhost:5000/health |

## 🛠️ Stack Technique

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Hook Form + Zod
- Axios

**Backend:**
- Node.js 18 + Express.js
- MongoDB + Mongoose
- JWT Authentication
- express-validator

## 👥 Rôles utilisateurs

| Rôle | Description |
|------|-------------|
| `customer` | Client - Parcourir, commander, suivre |
| `store_admin` | Admin magasin - Gérer produits et commandes |
| `super_admin` | Super admin - Gérer tous les magasins et utilisateurs |

## 📚 Documentation

- [API Reference](docs/API.md)
- [Guide d'installation](docs/SETUP.md)
- [Architecture](docs/ARCHITECTURE.md)

## 📋 Plan de développement

- [x] **Phase 1**: Setup infrastructure & authentification
- [ ] **Phase 2**: Panier, checkout, géolocalisation, paiements
- [ ] **Phase 3**: Suivi temps réel, avis, analytics, notifications
- [ ] **Phase 4**: Tests, optimisation, déploiement production
