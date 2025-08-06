import React from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/navigation";
import Home from "./components/home";
import PreviewImage from "./components/previewimage";
import UploadImage from "./components/uploadimage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import "./App.css";

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/login"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="app">
      {!shouldHideNavbar && <Navigation />}
      <Main />
    </div>
  );
};

const Main = () => (
  <Routes>
    <Route path="/" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/previewimage" element={<PreviewImage />} />
    <Route path="/uploadimage" element={<UploadImage />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default App;