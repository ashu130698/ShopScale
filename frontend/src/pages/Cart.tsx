import { useEffect, useState } from "react";
import api from "../api/axios";
import { getErrorMessage } from "../api/getErrorMessage";
import { useCart } from "../context/cart-context";

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface CartItem {
  product: Product | null;
  quantity: number;
}

interface CartData {
  items: CartItem[];
}

const getValidCart = async () => {
  const res = await api.get<CartData>("/cart");
  const items = res.data.items?.filter(
    (item): item is { product: Product; quantity: number } => item.product !== null,
  ) || [];

  return { ...res.data, items };
};

function Cart() {
  const [cart, setCart] = useState<CartData | null>(null);

  const { refreshCartCount } = useCart();

  const fetchCart = async () => {
    try {
      const nextCart = await getValidCart();
      setCart(nextCart);
    } catch (error) {
      console.error("Cart error:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadCart = async () => {
      try {
        const nextCart = await getValidCart();

        if (isMounted) {
          setCart(nextCart);
        }
      } catch (error) {
        console.error("Cart error:", error);
      }
    };

    void loadCart();

    return () => {
      isMounted = false;
    };
  }, []);

  const placeOrder = async () => {
    try {
      await api.post("/orders");
      alert("Order placed successfully");
      await fetchCart();
      await refreshCartCount();

      //reload cart after order
    } catch (error: unknown) {
      console.error("Order failed", error);
      const message = getErrorMessage(error, "Could not place order");
      alert(message);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;

    try {
      await api.put("/cart", { productId, quantity });
      await fetchCart();
      await refreshCartCount();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      await api.delete(`/cart/${productId}`);
      await fetchCart();
      await refreshCartCount();
    } catch (error) {
      console.error("Remove failed", error);
    }
  };
  const subtotal =
    cart?.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    ) || 0;
  const shipping = subtotal > 5000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  return (
    <main className="max-w-6xl mx-auto px-8 py-12">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Your Cart
        </h2>
        {cart && cart.items?.length > 0 && (
          <span className="bg-slate-100 px-4 py-1.5 rounded-full text-xs font-bold text-slate-600 uppercase tracking-widest">
            {cart.items.reduce((acc, item) => acc + item.quantity, 0)} Items
          </span>
        )}
      </div>

      {!cart || cart.items?.length === 0 ? (
        <div className="text-center py-32 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          </div>
          <p className="text-slate-500 font-semibold text-lg mb-6">
            Your shopping bag is empty
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-black text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-6">
            {cart.items.map((item) => (
              <div
                key={item.product._id}
                className="group flex flex-col sm:flex-row sm:items-center gap-6 p-6 bg-white border border-slate-100 rounded-[1.5rem] hover:border-slate-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-black transition-colors">
                    {item.product.name}
                  </h3>
                  <p className="text-slate-400 font-bold text-sm mt-1">
                    ₹{item.product.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-8">
                  <div className="flex items-center bg-slate-50 border border-slate-100 rounded-2xl p-1.5">
                    <button
                      className="w-10 h-10 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-600 active:scale-90"
                      onClick={() =>
                        updateQuantity(item.product._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-extrabold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      className="w-10 h-10 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-600 active:scale-90"
                      onClick={() =>
                        updateQuantity(item.product._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    onClick={() => removeItem(item.product._id)}
                    title="Remove item"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-[2rem] sticky top-32">
              <h3 className="text-xl font-extrabold text-slate-900 mb-8 tracking-tight">
                Order Summary
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm font-medium text-slate-500">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-500">
                  <span>Shipping</span>
                  <span
                    className={
                      shipping === 0
                        ? "text-green-600 font-bold"
                        : "text-slate-900 font-bold"
                    }
                  >
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-500">
                  <span>Estimated Tax (18%)</span>
                  <span className="text-slate-900 font-bold">
                    ₹{tax.toLocaleString()}
                  </span>
                </div>

                <div className="h-px bg-slate-200 my-6"></div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">
                    Total
                  </span>
                  <span className="text-2xl font-black text-black">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={placeOrder}
                className="w-full bg-black text-white font-extrabold py-5 rounded-2xl hover:bg-slate-800 active:scale-[0.98] transition-all shadow-xl shadow-slate-200 mb-4 flex items-center justify-center gap-3"
              >
                Checkout Now
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </button>

              <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Secure SSL Encryption
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Cart;
