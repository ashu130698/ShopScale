import { useState } from "react";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Home from "./pages/Home";

function App() {
  const [page, setPage] = useState<"home" | "cart" | "login">(
    localStorage.getItem("token") ? "home" : "login",
  );

  if (page === "login") return <Login />;

  return (
    <div>
      <button onClick={() => setPage("home")}>Home</button> <br />
      <button onClick={() => setPage("cart")}>Cart</button> <br />
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        Logout
      </button>
      {page === "home" && <Home />}
      {page === "cart" && <Cart />}
    </div>
  );
}

export default App;
