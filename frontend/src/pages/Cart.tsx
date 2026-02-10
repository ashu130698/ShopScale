import { useEffect, useState } from "react";
import api from "../api/axios";

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartData {
  items: CartItem[];
}

function Cart() {
  const [cart, setCart] = useState<CartData | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart");
        setCart(res.data);
      } catch (error) {
        console.error("Cart error:", error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>My Cart</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {!cart || cart.items?.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.items.map((item) => (
          <div key={item.product._id}>
            {item.product.name} — Qty: {item.quantity}
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;

