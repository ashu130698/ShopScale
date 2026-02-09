import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState<any>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:4000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCart(res.data);
      } catch (error) {
        console.error("Cart error:", error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div>
      <h2>My Cart</h2>

      {!cart || cart.items?.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.items.map((item: any) => (
          <div key={item.product._id}>
            {item.product.name} — Qty: {item.quantity}
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
