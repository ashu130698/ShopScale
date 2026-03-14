import { useEffect, useState } from "react";
import api from "../api/axios";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
}

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to load orders", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-8 py-12">
      <h2 className="text-3xl font-bold tracking-tight mb-10">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 font-medium mb-4">You haven't placed any orders yet</p>
          <a href="/" className="text-sm font-bold text-black hover:underline">Start Shopping</a>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-8 py-4 flex justify-between items-center border-b border-slate-100">
                <div className="flex gap-8">
                   <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-0.5">Order Date</p>
                      <p className="text-xs font-semibold text-slate-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                   </div>
                   <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-0.5">Order ID</p>
                      <p className="text-xs font-semibold text-slate-900">#{order._id.slice(-8).toUpperCase()}</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-0.5">Total Amount</p>
                   <p className="text-sm font-bold text-black">₹{order.totalAmount}</p>
                </div>
              </div>

              <div className="p-8 space-y-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                       <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                       <p className="text-sm font-medium text-slate-700">
                         {item.name} <span className="text-slate-400 ml-2">× {item.quantity}</span>
                       </p>
                    </div>
                    <p className="text-sm font-bold text-slate-900">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Orders;
