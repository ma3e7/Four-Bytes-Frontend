import { useState } from "react";
import "./signin.css";

import hideIcon from "../../assets/dont_watch.png";
import viewIcon from "../../assets/view.png";

export default function SignIn({ close }) {
    const [showPass, setShowPass] = useState(false);

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <button className="close-btn" onClick={close}>✖</button>

                <h2>Sign In</h2>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <div className="password-wrapper">
                        <input type={showPass ? "text" : "password"} />
                        <img
                            src={showPass ? viewIcon : hideIcon}
                            alt="toggle password"
                            className="toggle-pass"
                            onClick={() => setShowPass(!showPass)}
                        />
                    </div>
                </div>

                <button className="submit-btn">Sign In</button>
            </div>
        </div>
    );
}
