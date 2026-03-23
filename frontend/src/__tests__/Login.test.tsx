import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import { expect, it, describe } from "vitest";

describe("Login Component", () => {
    it("renders and email and password fields and sigh-in buttons", () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        //Check if fields exist by their label text
        expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

        //Check if the button is present
        const signInButton = screen.getByRole("button", { name: /Sign In/i });
        expect(signInButton).toBeInTheDocument();
    });
});