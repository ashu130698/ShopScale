import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { getErrorMessage } from "../api/getErrorMessage";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful! Please sign in with your credentials.");
      navigate("/login");
    } catch (error: unknown) {
      console.error("Register failed", error);
      const message = getErrorMessage(
        error,
        "Registration failed. Please check your network connection.",
      );
      alert(message);
    }
  };
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Create Account</h2>
          <p className="text-slate-500 text-sm">Join ShopScale to start shopping</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 ml-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-black focus:ring-0 px-4 py-3 rounded-xl text-sm transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 ml-1">Email Address</label>
            <input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-black focus:ring-0 px-4 py-3 rounded-xl text-sm transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-black focus:ring-0 px-4 py-3 rounded-xl text-sm transition-all"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-black text-white font-semibold py-3.5 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all mt-2"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account? <a href="/login" className="text-black font-semibold hover:underline">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
