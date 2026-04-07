import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import api from "../api/axios";
import { beforeEach, afterEach, expect, it, describe, vi } from "vitest";

vi.mock("../api/axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("Login Component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders and email and password fields and sigh-in buttons", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    //Check if fields exist by their label text
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    //Check if the button is present
    const signInButton = screen.getByRole("button", { name: /Sign In/i });
    expect(signInButton).toBeInTheDocument();
  });

  it("shows the backend error message when login fails", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const mockedApi = vi.mocked(api);

    mockedApi.post.mockRejectedValueOnce({
      response: {
        data: { message: "Invalid Credentials" },
      },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Email Address/i), "demo@example.com");
    await user.type(screen.getByLabelText(/Password/i), "wrongpassword");
    await user.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Invalid Credentials");
    });
  });
});
