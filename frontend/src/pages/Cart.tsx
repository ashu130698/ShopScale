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
    <main className="max-w-4xl mx-auto px-8 py-12">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Shopping Cart</h2>
        {cart && cart.items?.length > 0 && (
          <span className="text-sm font-medium text-slate-500">
            {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      {!cart || cart.items?.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 font-medium mb-4">Your cart is currently empty</p>
          <a href="/" className="text-sm font-bold text-black hover:underline">Continue Shopping</a>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl hover:border-slate-200 transition-all"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{item.product.name}</h3>
                  <p className="text-slate-500 font-medium text-sm mt-1">₹{item.product.price}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center bg-slate-100 rounded-xl p-1">
                    <button 
                      className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-slate-600" 
                      onClick={()=>updateQuantity(item.product._id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-slate-900">{item.quantity}</span>
                    <button 
                      className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-slate-600" 
                      onClick={()=>updateQuantity(item.product._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button 
                    className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors" 
                    onClick={()=>removeItem(item.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-end">
             <div className="flex items-center gap-12 mb-8">
                <span className="text-slate-500 font-medium">Subtotal</span>
                <span className="text-3xl font-bold">
                  ₹{cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}
                </span>
             </div>
             
             <button 
               onClick={placeOrder}
               className="w-full md:w-64 bg-black text-white font-semibold py-4 rounded-2xl hover:bg-slate-800 active:scale-[0.98] transition-all"
             >
               Place Order
             </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Cart;
