import React from "react";
import { NavLink, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/navigation";
import Home from "./components/home";
import PreviewImage from "./components/previewimage";
import UploadImage from "./components/uploadimage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import "./App.css";

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/login"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <div className="app">
      {!shouldHideNavbar && <Navigation></Navigation>}
      <Main></Main>
    </div>
  );
};

const Main = () => (
  <Routes>
    <Route path="/" element={<Signup></Signup>}></Route>
    <Route path="/login" element={<Login></Login>}></Route>
    <Route path="/home" element={<Home></Home>}></Route>
    <Route path="/previewimage" element={<PreviewImage></PreviewImage>}></Route>
    <Route path="/uploadimage" element={<UploadImage></UploadImage>}></Route>
    <Route path="/profile" element={<Profile></Profile>}></Route>
  </Routes>
);

export default App;
