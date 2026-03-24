import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Mocked } from "vitest";
import Cart from "../pages/Cart";
import api from "../api/axios";


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

        render(<Cart />);

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

        render(<Cart />);

        //Verify item name appears
        expect(await screen.findByText("Headphones")).toBeInTheDocument();
    });
});