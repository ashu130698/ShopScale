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

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;

    try {
      await api.put("/cart", { productId, quantity });
      window.location.reload();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      await api.delete(`/cart/${productId}`);
      window.location.reload();
    } catch (error) {
      console.error("Remove failed", error);
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
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.product._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p>₹{item.product.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-3 py-1 bg-gray-200 rounded" onClick={()=>updateQuantity(item.product._id, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button className="px-3 py-1 bg-gray-200 rounded" onClick={()=>updateQuantity(item.product._id, item.quantity + 1)}>
                  +
                </button>

                <button className="ml-4 text-red-600" onClick={()=>removeItem(item.product._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
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
