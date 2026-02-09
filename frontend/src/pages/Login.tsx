import axios from "axios";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:4000/api/auth/login", { email, password, });

            //store token
            localStorage.setItem("token", res.data.token);
            window.location.reload();
            console.log("TOKEN:", res.data.token);
            alert("Login successful");

        } catch (error) {
            console.error(error);
            alert("Invalid Credientials");
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