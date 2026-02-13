import { useState } from "react";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Orders from "./pages/Orders";

function App() {
  const [page, setPage] = useState<"home" | "cart" | "orders" | "login">(
    localStorage.getItem("token") ? "home" : "login",
  );

  if (page === "login") return <Login />;

  return (
    <div>
      <button onClick={() => setPage("home")}>Home</button> <br />
      <button onClick={() => setPage("cart")}>Cart</button> <br />
      <button onClick={() => setPage("orders")}>Orders</button>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        Logout
      </button>
      {/* render */}
      {page === "home" && <Home />}
      {page === "cart" && <Cart />}
      {page === "orders" && <Orders />} render
    </div>
  );
}

export default App;
