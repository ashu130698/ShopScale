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
        <div>
            {products.map((p) => (
                <div>
                    <div>
                        <img src="" alt="" />
                    </div>
                </div>
            ))}
        </div>
    )
}