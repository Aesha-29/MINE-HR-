import { useState } from "react";
import axios from "axios";
import API_BASE from "../api";
import "./login.css";

interface LoginProps {
    onLogin: (token: string, user: any) => void;
}

function Login({ onLogin }: LoginProps) {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setLoading(true);

        const trimmedIdentifier = identifier.trim();

        try {
            const res = await axios.post(`${API_BASE}/auth/login`, {
                identifier: trimmedIdentifier,
                password
            });

            const { token, user } = res.data;
            onLogin(token, user);
        } catch (err: any) {
            setMessage({
                type: "error",
                text: err.response?.data?.error || "Failed to login. Please try again."
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <div className="login-header">
                    <h2>MineHR Solutions</h2>
                    <p>Open sign-in access is enabled for now</p>
                </div>

                {message && (
                    <div className={message.type === "error" ? "login-error" : "login-success"}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Employee ID or Email</label>
                        <input
                            type="text"
                            required
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            placeholder="Enter your registered ID or email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                        <div className="help-text">Any existing account or temporary identifier can be used for now.</div>
                    </div>

                    <button type="submit" disabled={loading} className="btn-login">
                        {loading ? "Authenticating..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
