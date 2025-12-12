import { useState } from "react";
import "./signup.css";
import viewIcon from "../../assets/view.png";
import hideIcon from "../../assets/dont_watch.png";
import { signUp } from "../../services/authService";

export default function SignUp({ close, onLogin }) {
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPass) return setError("Passwords do not match");

        try {
            const res = await signUp(username, password);
            localStorage.setItem("token", res.token); // ako backend vraća token, ili možeš uraditi login odmah nakon registracije
            onLogin(res.user);
            close();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <button className="close-btn" onClick={close}>✖</button>
                <h2>Sign Up</h2>
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
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <div className="password-wrapper">
                            <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type={showConfirmPass ? "text" : "password"} />
                            <img
                                src={showConfirmPass ? viewIcon : hideIcon}
                                alt="toggle password"
                                className="toggle-pass"
                                onClick={() => setShowConfirmPass(!showConfirmPass)}
                            />
                        </div>
                    </div>
                    <button className="submit-btn" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}
