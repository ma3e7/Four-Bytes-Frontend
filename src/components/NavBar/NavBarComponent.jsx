import React from "react";
import { Link } from "react-router-dom";
import './navbar.css';

export default function Navbar({ isLoggedIn, onSignOut }) {
    return (
        <nav className="navbar">
            <div className="left">
                {isLoggedIn && (
                    <Link to="/bookmarks" className="nav-link">
                        Bookmarks
                    </Link>
                )}
            </div>

            <div className="center">
                <Link to="/" className="logo">
                    MyLogo
                </Link>
            </div>

            <div className="right">
                {!isLoggedIn ? (
                    <>
                        <Link to="/signin">
                            <button className="btn btn-outline">Sign In</button>
                        </Link>
                        <Link to="/signup">
                            <button className="btn btn-filled">Sign Up</button>
                        </Link>
                    </>
                ) : (
                    <button onClick={onSignOut} className="btn btn-danger">
                        Sign Out
                    </button>
                )}
            </div>
        </nav>
    );
}
