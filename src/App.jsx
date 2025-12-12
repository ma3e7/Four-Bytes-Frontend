import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar/NavBarComponent
import HomePage from "./pages/HomePage";
import SignIn from "./components/SignIn/SignInComponent";
import SignUp from "./components/SignUp/SignUpComponent";
import RecipePage from "./pages/RecipePage";
import BookmarkPage from "./pages/BookmarkPage";

export default function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogin = (loggedUser) => {
    setUser(loggedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <Navbar
        isLoggedIn={!!user}
        onSignOut={handleLogout}
        openSignIn={() => navigate("/signin")}
        openSignUp={() => navigate("/signup")}
      />

      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
        <Route path="/recipe/:name" element={<RecipePage user={user} />} />
        <Route path="/bookmarks" element={<BookmarkPage user={user} />} />
      </Routes>
    </>
  );
}
