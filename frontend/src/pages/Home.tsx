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

  return (
    <div>
      <h1>Products</h1>

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map((p) => (
          <div key={p._id}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <strong>₹{p.price}</strong>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
