import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!token) return null;

   return (
     <div className="flex justify-between items-center px-6 py-3 border-b bg-gray-100">
       <div className="font-bold text-xl">ShopScale</div>

       <div className="flex gap-6">
         <Link to="/" className="hover:text-blue-600">
           Home
         </Link>
         <Link to="/cart" className="hover:text-blue-600">
           Cart
         </Link>
         <Link to="/orders" className="hover:text-blue-600">
           Orders
         </Link>
         <button onClick={logout} className="text-red-600 hover:underline">
           Logout
         </button>
       </div>
     </div>
   );
}

export default Navbar;