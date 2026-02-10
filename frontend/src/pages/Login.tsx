import api from "../api/axios";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", { email, password });

            //store token
            localStorage.setItem("token", res.data.token);
            console.log("TOKEN:", res.data.token);
            alert("Login successful");
            window.location.reload();

        } catch (error) {
            console.error(error);
            alert("Invalid Credentials");
        }
    };
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br /><br />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                
                <button type="submit">Login</button>
        </form>
      </div>
    );
}

export default Login;