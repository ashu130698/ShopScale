import { useEffect, useState } from "react";
import api from "../api/axios";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
};

function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId: string) => {
    try {
      await api.post("/cart", {
        productId,
        quantity: 1,
      });

      alert("Added to cart");
    } catch (error) {
      console.error("Added to cart failed", error);
      alert("Could not add item");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-gray-600 mt-2 min-h-[40px]">{p.description}</p>

              <div className="mt-4 text-xl font-bold">₹{p.price}</div>

              <br /><br />

              <button onClick={() => addToCart(p._id)} className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add To Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
