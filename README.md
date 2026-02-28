# ShopScale

A full-stack e-commerce application built with the MERN stack.

## Tech Stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Auth:** JWT, bcryptjs

## Features

- User registration & login with JWT authentication
- Product listing and browsing
- Cart management (add, update, remove items)
- Order placement and order history
- Protected routes for authenticated users
- RESTful API with error handling

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB

### Installation

```bash
# Clone the repo
git clone https://github.com/ashu130698/ShopScale.git
cd ShopScale

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the App

```bash
# Start backend (from /backend)
npm run dev

# Start frontend (from /frontend)
npm run dev
```

## Project Structure

```
shopscale/
├── backend/
│   └── src/
│       ├── controllers/    # Route handlers
│       ├── models/         # Mongoose schemas
│       ├── routes/         # API routes
│       ├── middleware/      # Auth & error handling
│       └── server.js       # Entry point
├── frontend/
│   └── src/
│       ├── pages/          # Home, Cart, Orders, Login, Register
│       ├── components/     # Navbar
│       └── api/            # API client
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/products` | Get all products |
| GET | `/api/cart` | Get user's cart |
| POST | `/api/cart` | Add item to cart |
| GET | `/api/orders` | Get user's orders |
| POST | `/api/orders` | Place an order |


