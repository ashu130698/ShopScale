import api from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", { email, password });

            //store token
            localStorage.setItem("token", res.data.token);
            console.log("TOKEN:", res.data.token);
            alert("Login successful");
            navigate("/");
            window.location.reload(); // Still helpful to refresh the App state/Navbar

        } catch (error) {
            console.error(error);
            alert("Invalid Credentials");
        }
    };
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back</h2>
                    <p className="text-slate-500 text-sm">Please enter your details to sign in</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 ml-1">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="name@company.com" 
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
                        Sign In
                    </button>

                    <p className="text-center text-sm text-slate-500 mt-6">
                        Don't have an account? <a href="/register" className="text-black font-semibold hover:underline">Create one</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;