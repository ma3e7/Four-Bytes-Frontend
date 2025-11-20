import { useState } from "react";
import "./signup.css";
import viewIcon from "../../assets/view.png";
import hideIcon from "../../assets/dont_watch.png";

export default function SignUp({ close }) {
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <button className="close-btn" onClick={close}>✖</button>

                <h2>Sign Up</h2>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <div className="password-wrapper">
                        <input type={showPass ? "text" : "password"} />
                        <img
                            src={showPass ? hideIcon : viewIcon}
                            alt="toggle password"
                            className="toggle-pass"
                            onClick={() => setShowPass(!showPass)}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <div className="password-wrapper">
                        <input type={showConfirmPass ? "text" : "password"} />
                        <img
                            src={showConfirmPass ? hideIcon : viewIcon}
                            alt="toggle password"
                            className="toggle-pass"
                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                        />
                    </div>
                </div>

                <button className="submit-btn">Sign Up</button>
            </div>
        </div>
    );
}
