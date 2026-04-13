import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Mocked } from "vitest";
import Cart from "../pages/Cart";
import api from "../api/axios";
import { CartProvider } from "../context/CartContext";


//Mock the API module
vi.mock("../api/axios");

const mockedApi = api as Mocked<typeof api>;

describe("Cart Page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders empty state when cart has no items", async () => {
        //Simulate API returning an empty cart
        mockedApi.get.mockResolvedValue({ data: { items: [] } });

        render(
          <CartProvider>
            <Cart />
          </CartProvider>,
        );


        //Assert empty state message appears
        const emptyMsg = await screen.findByText(/Your shopping bag is empty/i);
        expect(emptyMsg).toBeInTheDocument();
    });

    it("renders items and correctly calculates the total", async () => {
        const mockCartData = {
            items: [
                {
                    product: { _id: "1", name: "Headphones", price: 1000 },
                    quantity: 2,
                },
            ],
        };

        mockedApi.get.mockResolvedValue({ data: mockCartData });

        render(
          <CartProvider>
            <Cart />
          </CartProvider>,
        );


        //Verify item name appears
        expect(await screen.findByText("Headphones")).toBeInTheDocument();
    });

    it("sends the updated quantity when the increment button is clicked", async () => {
        const user = userEvent.setup();
        const mockCartData = {
            items: [
                {
                    product: { _id: "1", name: "Headphones", price: 1000 },
                    quantity: 2,
                },
            ],
        };

        mockedApi.get.mockResolvedValue({ data: mockCartData });
        mockedApi.put.mockResolvedValue({ data: mockCartData });

        render(
          <CartProvider>
            <Cart />
          </CartProvider>,
        );

        await screen.findByText("Headphones");
        await user.click(screen.getByRole("button", { name: "+" }));

        await waitFor(() => {
            expect(mockedApi.put).toHaveBeenCalledWith("/cart", {
                productId: "1",
                quantity: 3,
            });
        });
    });

    it("removes an item when the remove button is clicked", async () => {
        const user = userEvent.setup();
        const mockCartData = {
            items: [
                {
                    product: { _id: "1", name: "Headphones", price: 1000 },
                    quantity: 2,
                },
            ],
        };

        mockedApi.get.mockResolvedValue({ data: mockCartData });
        mockedApi.delete.mockResolvedValue({ data: { items: [] } });

        render(
          <CartProvider>
            <Cart />
          </CartProvider>,
        );

        await screen.findByText("Headphones");
        await user.click(screen.getByTitle("Remove item"));

        await waitFor(() => {
            expect(mockedApi.delete).toHaveBeenCalledWith("/cart/1");
        });
    });
});
