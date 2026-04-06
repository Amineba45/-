# Samba Service - API Documentation

Base URL: `http://localhost:5000/api/v1`

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register
`POST /auth/register`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "Amadou",
  "lastName": "Diallo",
  "phone": "+221771234567"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGci...",
    "refreshToken": "eyJhbGci...",
    "user": { "id": "...", "email": "...", "role": "customer" }
  }
}
```

### Login
`POST /auth/login`

**Body:**
```json
{ "email": "user@example.com", "password": "password123" }
```

### Get Current User
`GET /auth/me` *(Protected)*

### Logout
`POST /auth/logout` *(Protected)*

### Refresh Token
`POST /auth/refresh-token`

**Body:**
```json
{ "refreshToken": "eyJhbGci..." }
```

---

## Stores Endpoints

### List Stores
`GET /stores`

**Query Parameters:**
- `lat` - User latitude (optional, for distance filter)
- `lng` - User longitude (optional, for distance filter)
- `radius` - Search radius in km (default: 10)
- `status` - Filter by status (default: active)

### Get Store
`GET /stores/:id`

### Create Store
`POST /stores` *(SuperAdmin)*

**Body:**
```json
{
  "name": "SAMBA BA - Keur Massar",
  "address": "À côté du pont, devant la pharmacie",
  "latitude": 14.7729,
  "longitude": -17.3236,
  "deliveryFee": 500,
  "deliveryRadius": 5,
  "minOrderAmount": 2000
}
```

### Update Store
`PUT /stores/:id` *(Admin/SuperAdmin)*

### Delete Store
`DELETE /stores/:id` *(SuperAdmin)*

---

## Products Endpoints

### List Products
`GET /products`

**Query Parameters:**
- `storeId` - Filter by store
- `categoryId` - Filter by category
- `search` - Full-text search
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 20)

### Get Product
`GET /products/:id`

### Create Product
`POST /products` *(StoreAdmin/SuperAdmin)*

**Body:**
```json
{
  "name": "Riz local 5kg",
  "description": "Riz parfumé du Sénégal",
  "price": 3500,
  "storeId": "...",
  "categoryId": "...",
  "stock": 100,
  "unit": "kg"
}
```

### Update Product
`PUT /products/:id` *(StoreAdmin/SuperAdmin)*

### Delete Product
`DELETE /products/:id` *(StoreAdmin/SuperAdmin)*

---

## Orders Endpoints

### List Orders
`GET /orders` *(Protected)*

Customers see their own orders. Store admins see their store orders. SuperAdmin sees all.

**Query Parameters:**
- `storeId` - Filter by store (SuperAdmin only)
- `status` - Filter by status
- `page`, `limit` - Pagination

### Get Order
`GET /orders/:id` *(Protected)*

### Create Order
`POST /orders` *(Customer)*

**Body:**
```json
{
  "storeId": "...",
  "items": [
    { "productId": "...", "quantity": 2 }
  ],
  "deliveryAddress": "123 Rue de la Paix, Dakar",
  "latitude": 14.7197,
  "longitude": -17.4677,
  "paymentMethod": "orange_money",
  "notes": "Sonner au portail"
}
```

### Update Order Status
`PUT /orders/:id/status` *(StoreAdmin/SuperAdmin)*

**Body:**
```json
{ "orderStatus": "confirmed" }
```

**Valid statuses:** `pending` → `confirmed` → `preparing` → `out_for_delivery` → `delivered` | `cancelled`

---

## Categories Endpoints

### List Categories
`GET /categories`

**Query Parameters:**
- `storeId` - Filter by store

### Create Category
`POST /categories` *(StoreAdmin/SuperAdmin)*

### Update Category
`PUT /categories/:id` *(StoreAdmin/SuperAdmin)*

### Delete Category
`DELETE /categories/:id` *(StoreAdmin/SuperAdmin)*

---

## Users Endpoints

### List Users
`GET /users` *(SuperAdmin)*

### Get User
`GET /users/:id` *(SuperAdmin)*

### Update Profile
`PUT /users/profile` *(Protected)*

### Update User
`PUT /users/:id` *(SuperAdmin)*

### Delete User
`DELETE /users/:id` *(SuperAdmin)*

---

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Roles & Permissions

| Action | Customer | StoreAdmin | SuperAdmin |
|--------|----------|------------|------------|
| View stores | ✅ | ✅ | ✅ |
| View products | ✅ | ✅ | ✅ |
| Create order | ✅ | ❌ | ❌ |
| Manage products | ❌ | ✅ | ✅ |
| Manage orders status | ❌ | ✅ | ✅ |
| Manage stores | ❌ | ❌ | ✅ |
| Manage users | ❌ | ❌ | ✅ |
