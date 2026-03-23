import React from "react";

//Define the product type to match your api
type Product = {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
};

interface ProductListProps {
    products: Product[];
    addToCart: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart }) => {
    //Logic for empty state
    if (products.length === 0) {
        return (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-slate-500 font-medium">No products available</p>
            </div>
        );
    }

    //logic for rendering the list
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <div
            key={p._id}
            className="group relative flex flex-col bg-white border border-slate-100 p-4 rounded-3xl hover:border-slate-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300"
          >
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
              <span className="text-xl font-extrabold text-slate-900">
                ₹{p.price.toLocaleString()}
              </span>
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
    );
};

export default ProductList;