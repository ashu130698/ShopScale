import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import api from "../api/axios";
import { CartContext } from "./cart-context";

interface CartProduct {
  _id: string;
}

interface CartItem {
  product: CartProduct | null;
  quantity: number;
}

interface CartResponse {
  items?: CartItem[];
}

const getCartCount = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return 0;
  }

  const res = await api.get<CartResponse>("/cart");
  const items = res.data.items || [];

  return items.reduce((acc, item) => {
    if (!item.product) {
      return acc;
    }

    return acc + item.quantity;
  }, 0);
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = async () => {
    try {
      const nextCount = await getCartCount();
      setCartCount(nextCount);
    } catch (error) {
      console.error("Error refreshing cart count:", error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const syncCartCount = async () => {
      try {
        const nextCount = await getCartCount();

        if (isMounted) {
          setCartCount(nextCount);
        }
      } catch (error) {
        console.error("Error refreshing cart count:", error);

        if (isMounted) {
          setCartCount(0);
        }
      }
    };

    void syncCartCount();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
