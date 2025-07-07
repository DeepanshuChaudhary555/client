import React from "react";
import { NavLink, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/navigation";
import Home from "./components/home";
import PreviewImage from "./components/previewimage";
import UploadImage from "./components/uploadimage";
import Signup from "./signup/Signup";
import Login from "./components/login/Login";
import "./App.css";

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/login";
  return (
    <div className="app">
      {/* <h1 className="text-center">IMAGE UPLOADER</h1> */}
      { !hideNavbar && <Navigation />}
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
  </Routes>
);

export default App;
