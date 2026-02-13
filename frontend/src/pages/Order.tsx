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
    <div>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order._id}>
            <h3>Order</h3>

            {order.items.map((item, i) => (
              <div key={i}>
                {item.name} — {item.quantity} × ₹{item.price}
              </div>
            ))}

            <strong>Total: ₹{order.totalAmount}</strong>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
