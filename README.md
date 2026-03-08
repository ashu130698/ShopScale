ShopScale - MERN E-Commerce Platform
Overview
ShopScale is a full-stack e-commerce platform built with the MERN stack. It demonstrates a complete shopping workflow including authentication, product discovery, cart management, and order processing.
The project focuses on clean API design, authentication, and real-world e-commerce data flow rather than UI alone.

Tech Stack
Frontend

React
TypeScript
Vite
Tailwind CSS
React Router
Axios (with interceptor)

Backend

Node.js
Express.js
MongoDB
Mongoose

Authentication

JWT (JSON Web Tokens)
bcryptjs password hashing
Protected routes middleware


Key Features
Authentication

User registration and login
Password hashing using bcrypt
JWT-based authentication
Protected API routes
Role-based authorization support

Product Catalog

Product listing
Product search using MongoDB regex
Pagination support for large catalogs

Example:
GET /api/products?keyword=iphone&page=1
Backend implements:

limit()
skip()
countDocuments()

Shopping Cart
Persistent user-specific cart stored in MongoDB.
Cart supports:

Add item to cart
Increase quantity
Decrease quantity
Remove item
Cart tied to authenticated user

Orders System
Checkout flow:
Cart → Place Order → Order saved → Cart cleared
Orders store a snapshot of product data including:

Product name
Price
Quantity
Total amount

This ensures order history remains accurate even if product prices change later.
Frontend Features

React Router with protected routes
Axios interceptor for automatic JWT attachment
Responsive UI with Tailwind CSS
Product search with debounced API calls
Interactive cart management
Order history page


Application Flow
User registers / logs in
        ↓
JWT issued by backend
        ↓
Frontend stores token
        ↓
Axios interceptor attaches token
        ↓
Protected APIs accessed
        ↓
User can manage cart and place orders

Getting Started
Prerequisites

Node.js (v18+)
MongoDB (local or cloud instance)

Installation
Clone the repository:
bashgit clone https://github.com/ashu130698/ShopScale.git
cd ShopScale
Install backend dependencies:
bashcd backend
npm install
Install frontend dependencies:
bashcd ../frontend
npm install
```

### Environment Variables

**Backend** (.env in `/backend`):
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=4000
NODE_ENV=development
```

**Frontend** (.env in `/frontend`):
```
VITE_API_URL=http://localhost:4000
Running the Application
Start backend:
bashcd backend
npm run dev
Start frontend:
bashcd frontend
npm run dev
```

**Frontend URL:**
```
http://localhost:5173
```

**Backend API:**
```
http://localhost:4000
```

---

## Project Structure
```
ShopScale/
│
├── backend/
│   └── src/
│       ├── controllers/      # Business logic
│       ├── models/           # Mongoose schemas
│       ├── routes/           # API routes
│       ├── middleware/       # Auth & error handling
│       └── server.js         # Backend entry point
│
├── frontend/
│   └── src/
│       ├── pages/            # Home, Cart, Orders, Login, Register
│       ├── components/       # Navbar and UI components
│       ├── api/              # Axios client
│       └── main.tsx
│
└── README.md

API Endpoints
MethodEndpointDescriptionPOST/api/auth/registerRegister userPOST/api/auth/loginLogin userGET/api/productsGet all productsGET/api/products?keyword=Search productsGET/api/products?page=Paginated productsGET/api/cartGet user cartPOST/api/cartAdd item to cartPUT/api/cartUpdate quantityDELETE/api/cart/:idRemove itemGET/api/ordersGet order historyPOST/api/ordersPlace order

Future Improvements

Product image uploads
Payment integration (Stripe/PayPal)
Admin product management dashboard
Deployment with Docker
Redux-based global state management
Email notifications for orders
Product reviews and ratings
Wishlist functionality


License
MIT License