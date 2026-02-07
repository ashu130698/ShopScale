import axios from "axios";
import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("API error:", error);
      }
    };
    fetchProducts();
  }, []);
  
  return (
    <div>
      <h1>Shopscale Products</h1>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((p) => (
          <div key={p._id}>
            {p.name}-₹{p.price}
          </div>
        ))
      )}
    </div>
  );
}

export default App;