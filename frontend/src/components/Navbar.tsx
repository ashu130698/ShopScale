import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { cartCount } = useCart();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        window.location.reload();
    };

    if (!token) return null;

   return (
     <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 border-b bg-white/80 backdrop-blur-md">
       <div className="font-bold text-xl tracking-tight">ShopScale</div>

       <div className="flex items-center gap-8">
         <Link to="/" className="text-sm font-medium text-slate-600 hover:text-black transition-colors">
           Home
         </Link>
         <Link to="/cart" className="text-sm font-medium text-slate-600 hover:text-black transition-colors relative">
           Cart
           {cartCount > 0 && (
             <span className="absolute -top-2 -right-3.5 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-white">
               {cartCount}
             </span>
           )}
         </Link>
         <Link to="/orders" className="text-sm font-medium text-slate-600 hover:text-black transition-colors">
           Orders
         </Link>
         <button 
           onClick={logout} 
           className="ml-4 text-xs font-semibold px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-slate-600"
         >
           Logout
         </button>
       </div>
     </nav>
   );
}

export default Navbar;