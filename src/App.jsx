
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignIn from "./components/SignIn/SignInComponent";
import SignUp from "./components/SignUp/SignUpComponent";
import RecipePage from "./pages/RecipePage";
import BookmarkPage from "./pages/BookmarkPage";


export default function App() {
  return (

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/recipe/:name" element={<RecipePage />} />
      <Route path="/bookmarks" element={<BookmarkPage />} />

    </Routes>

  );
}
