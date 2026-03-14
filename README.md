# ShopScale 🛒

A modern, minimalist e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript.

## ✨ Features
- **Clean UI:** Modern, minimalist design using Tailwind CSS and Inter font.
- **Authentication:** Secure JWT-based authentication with protected routes.
- **Product Management:** Search, pagination, and administrative controls.
- **Shopping Cart:** Add, remove, and update quantities with real-time stock validation.
- **Order System:** Secure checkout flow with inventory decrementing.
- **Security:** Equipped with `helmet`, `cors`, and `express-rate-limit` for production safety.
- **Logging:** Professional logging with Winston (logs to console and files).

## 🛠️ Tech Stack
- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS, Axios.
- **Backend:** Node.js, Express, MongoDB (Mongoose), Winston.

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB Cluster (Atlas)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd shopscale
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory using `.env.example`:
```env
PORT=4000
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=your_cluster.mongodb.net
DB_NAME=shopscale
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```
Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_BASE_URL=http://localhost:4000/api
```
Run the frontend:
```bash
npm run dev
```

## 🔒 Security & Performance
- **Inventory Logic:** Prevents overselling by validating stock before orders.
- **Mass Assignment Protection:** Strictly pick allowed fields during updates.
- **Rate Limiting:** Protects API from brute-force attacks.
- **Environment Aware:** Uses dynamic base URLs for seamless deployment.

## 📄 License
ISC
