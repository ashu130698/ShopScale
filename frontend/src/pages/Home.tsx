import { useEffect, useState } from "react";
import api from "../api/axios";
import axios from "axios";
import { useCart } from "../context/cart-context";
import ProductList from "../components/ProductList";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const { refreshCartCount } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
      setPage(1);
    }, 500); //wait 500ms after typing stops

    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get(
          `/products?page=${page}&keyword=${debouncedKeyword}`,
        );
        setProducts(res.data.products);
        setPages(res.data.pages);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, [page, debouncedKeyword]);

  const addToCart = async (productId: string) => {
    try {
      await api.post("/cart", {
        productId,
        quantity: 1,
      });

      refreshCartCount();
      alert("Added to cart");
    } catch (error) {
      console.error("Added to cart failed", error);
      let message = "Could not add item";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      alert(message);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-black focus:ring-0 px-4 py-2.5 rounded-xl text-sm transition-all"
          />
        </div>
      </div>

      <ProductList products={products} addToCart={addToCart} />

      {products.length > 0 && (
        /* Pagination */
        <div className="flex justify-center mt-16 items-center gap-1">
          {[...Array(pages).keys()].map((x) => (
            <button
              key={x + 1}
              onClick={() => setPage(x + 1)}
              className={`w-10 h-10 flex items-center justify-center text-sm font-semibold rounded-xl transition-all ${
                page === x + 1
                  ? "bg-black text-white"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {x + 1}
            </button>
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;
