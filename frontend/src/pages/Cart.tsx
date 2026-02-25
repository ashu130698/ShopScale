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

  const placeOrder = async () => {
    try {
      await api.post("/orders");
      alert("Order placed succesfully");

      //reload cart after order
      window.location.reload();
    } catch (error) {
      console.error("Order failed", error);
      alert("Could not place order");
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>My Cart</h2>
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
      {cart && cart.items?.length > 0 && (
        <>
          <br />
          <button onClick={placeOrder}>Place Order</button>
        </>
      )}
    </div>
  );
}

export default Cart;
