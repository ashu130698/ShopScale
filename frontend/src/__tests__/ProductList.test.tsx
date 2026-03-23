import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProductList from "../components/ProductList";


describe("ProductList Component", () => {
    const mockProducts = [
        {
            _id: "1",
            name: "Modern Chair",
            price: 4500,
            description: "Comfortable chair",
            image: "chair.jpg",
        },
        {
            _id: "2",
            name: "Oak Table",
            price: 12000,
            description: "Solid oak",
            image: "table.jpg",
        },
    ];

    it("renders the list of products passed via props", () => {
        render(<ProductList products={ mockProducts } addToCart={vi.fn()} />);
    
    //Assert that products names appear on screen
    expect(screen.getByText("Modern Chair")).toBeInTheDocument();
    expect(screen.getByText("Oak Table")).toBeInTheDocument();

    //Check if the prices are rendered
    expect(screen.getByText(/₹4,500/)).toBeInTheDocument();
});
});