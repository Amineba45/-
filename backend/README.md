# Samba Service - Backend

Node.js/Express backend API for the Samba Service multi-store e-commerce platform.

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Refresh Tokens
- **Validation**: express-validator

## Setup

1. Clone the repository
2. Navigate to `backend/` directory
3. Copy `.env.example` to `.env` and fill in the values
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user (Protected)
- `POST /api/v1/auth/logout` - Logout (Protected)
- `POST /api/v1/auth/refresh-token` - Refresh JWT token

### Stores
- `GET /api/v1/stores` - Get all stores (with optional geolocation filter)
- `GET /api/v1/stores/:id` - Get a single store
- `POST /api/v1/stores` - Create store (SuperAdmin)
- `PUT /api/v1/stores/:id` - Update store (Admin/SuperAdmin)
- `DELETE /api/v1/stores/:id` - Delete store (SuperAdmin)

### Products
- `GET /api/v1/products` - Get products (filterable by store, category, search)
- `GET /api/v1/products/:id` - Get a single product
- `POST /api/v1/products` - Create product (StoreAdmin/SuperAdmin)
- `PUT /api/v1/products/:id` - Update product (StoreAdmin/SuperAdmin)
- `DELETE /api/v1/products/:id` - Delete product (StoreAdmin/SuperAdmin)

### Orders
- `GET /api/v1/orders` - Get orders (role-based filtering)
- `GET /api/v1/orders/:id` - Get a single order
- `POST /api/v1/orders` - Create order (Customer)
- `PUT /api/v1/orders/:id/status` - Update order status (StoreAdmin/SuperAdmin)

### Categories
- `GET /api/v1/categories` - Get categories
- `POST /api/v1/categories` - Create category (StoreAdmin/SuperAdmin)
- `PUT /api/v1/categories/:id` - Update category (StoreAdmin/SuperAdmin)
- `DELETE /api/v1/categories/:id` - Delete category (StoreAdmin/SuperAdmin)

### Users
- `GET /api/v1/users` - Get all users (SuperAdmin)
- `GET /api/v1/users/:id` - Get a single user (SuperAdmin)
- `PUT /api/v1/users/profile` - Update own profile (Protected)
- `PUT /api/v1/users/:id` - Update user (SuperAdmin)
- `DELETE /api/v1/users/:id` - Delete user (SuperAdmin)
