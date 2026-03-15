import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

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
    } catch (error: any) {
      console.error("Added to cart failed", error);
      const message = error.response?.data?.message || "Could not add item";
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

      {products.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 font-medium">No products available</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <div
                key={p._id}
                className="group relative flex flex-col bg-white border border-slate-100 p-4 rounded-3xl hover:border-slate-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300"
              >
                {/* Product Image */}
                <div className="aspect-square w-full mb-4 overflow-hidden rounded-2xl bg-slate-100">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 px-1">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-black transition-colors">{p.name}</h3>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed line-clamp-2">
                    {p.description}
                  </p>
                </div>

                <div className="mt-6 px-1 flex items-center justify-between">
                  <span className="text-xl font-extrabold text-slate-900">₹{p.price}</span>
                  <button
                    onClick={() => addToCart(p._id)}
                    className="bg-black text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-slate-800 active:scale-95 transition-all shadow-sm"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
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
        </>
      )}
    </main>
  );
}

export default Home;
