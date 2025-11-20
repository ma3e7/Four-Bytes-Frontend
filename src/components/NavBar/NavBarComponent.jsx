import { Link } from "react-router-dom";
import './navbar.css';

export default function Navbar({ isLoggedIn, onSignOut, openSignIn, openSignUp }) {
    return (
        <nav className="navbar">
            <div className="left">
                {isLoggedIn && <Link to="/bookmarks">Bookmarks</Link>}
            </div>

            <div className="center">
                <Link to="/" className="logo">MyLogo</Link>
            </div>

            <div className="right">
                {!isLoggedIn ? (
                    <>
                        <button className="btn btn-outline" onClick={openSignIn}>Sign In</button>
                        <button className="btn btn-filled" onClick={openSignUp}>Sign Up</button>
                    </>
                ) : (
                    <button className="btn btn-danger" onClick={onSignOut}>Sign Out</button>
                )}
            </div>
        </nav>
    );
}

