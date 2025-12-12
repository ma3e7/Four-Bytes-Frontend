import { useState } from "react";
import "./signin.css";
import hideIcon from "../../assets/dont_watch.png";
import viewIcon from "../../assets/view.png";
import { signIn } from "../../services/authService";

export default function SignIn({ close, onLogin }) {
    const [showPass, setShowPass] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn(username, password);
            localStorage.setItem("token", res.token);
            onLogin(res.user); // šaljemo info o korisniku npr. u App state
            close();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <button className="close-btn" onClick={close}>✖</button>
                <h2>Sign In</h2>
                {error && <p className="error-msg">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="password-wrapper">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPass ? "text" : "password"} />
                            <img
                                src={showPass ? viewIcon : hideIcon}
                                alt="toggle password"
                                className="toggle-pass"
                                onClick={() => setShowPass(!showPass)}
                            />
                        </div>
                    </div>
                    <button className="submit-btn" type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}
