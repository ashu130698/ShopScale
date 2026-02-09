import { useState } from "react";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  return loggedIn ? <Cart /> : <Login />;
}

export default App;
