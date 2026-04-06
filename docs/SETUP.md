# Samba Service - Guide d'installation

## Prérequis

- Node.js 18+
- npm 9+
- MongoDB Atlas account (ou MongoDB local)
- Git

## Installation rapide

### 1. Cloner le repository

```bash
git clone https://github.com/Amineba45/-.git
cd -
```

### 2. Configurer le Backend

```bash
cd backend

# Copier les variables d'environnement
cp .env.example .env

# Éditer .env avec vos valeurs
nano .env

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev
```

**Variables d'environnement requises pour le backend :**

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | URI de connexion MongoDB Atlas |
| `JWT_SECRET` | Clé secrète pour les tokens JWT (min. 32 caractères) |
| `REFRESH_TOKEN_SECRET` | Clé secrète pour les refresh tokens |
| `PORT` | Port du serveur (défaut: 5000) |

### 3. Configurer le Frontend

```bash
cd frontend

# Copier les variables d'environnement
cp .env.example .env.local

# Éditer .env.local avec vos valeurs
nano .env.local

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev
```

**Variables d'environnement requises pour le frontend :**

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | URL de l'API backend (défaut: http://localhost:5000/api/v1) |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Token Mapbox pour les cartes |

### 4. Accéder à l'application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health check: http://localhost:5000/health

---

## Installation avec Docker

```bash
# À la racine du projet
cp backend/.env.example backend/.env
# Éditer backend/.env

docker-compose up -d
```

---

## Création du premier SuperAdmin

Après le démarrage, créez un compte SuperAdmin directement dans MongoDB:

```javascript
// Dans MongoDB Compass ou Atlas
db.users.insertOne({
  email: "admin@sambaservice.com",
  password: "$2b$12$...", // hash bcrypt de votre mot de passe
  firstName: "Super",
  lastName: "Admin",
  role: "super_admin",
  isActive: true,
  createdAt: new Date()
})
```

Ou via script:
```bash
cd backend
node -e "
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('AdminPassword123!', 12);
console.log(hash);
"
```

---

## Configuration MongoDB Atlas

1. Créer un compte sur [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Créer un cluster (tier gratuit M0 disponible)
3. Configurer l'accès réseau (ajouter votre IP)
4. Créer un utilisateur de base de données
5. Copier l'URI de connexion dans `MONGODB_URI`

Format de l'URI:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/samba_service?retryWrites=true&w=majority
```

---

## Structure des ports

| Service | Port | Description |
|---------|------|-------------|
| Frontend (Next.js) | 3000 | Interface utilisateur |
| Backend (Express) | 5000 | API REST |
| MongoDB | 27017 | Base de données (local) |

---

## Déploiement en production

### Frontend (Vercel)
```bash
npm install -g vercel
cd frontend
vercel --prod
```

### Backend (Railway/Render)
1. Connecter votre repo GitHub
2. Configurer les variables d'environnement
3. Le service démarre automatiquement avec `npm start`

---

## Résolution de problèmes

**Erreur de connexion MongoDB:**
- Vérifier que l'IP est autorisée dans Atlas Network Access
- Vérifier les credentials dans `MONGODB_URI`

**Erreur CORS:**
- Vérifier que `FRONTEND_URL` dans le backend correspond à l'URL du frontend

**Token JWT invalide:**
- Vérifier que `JWT_SECRET` est identique dans toutes les instances backend
