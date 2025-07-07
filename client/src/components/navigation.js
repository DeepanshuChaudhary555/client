import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => (
  <nav className="navbar navbar-expand-lg bg-white navbar-light text-dark justify-content-center">
    <div className="container-fluid">
      <NavLink className="navbar-brand mx-auto" to="/home">
        Image Uploader
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/previewimage">
              Preview Images
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/uploadimage">
              Upload Images
            </NavLink>
          </li>
          <li className="nav-item dropdown ">
            <NavLink
              className="nav-link dropdown-toggle"
             to="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              My Account
            </NavLink>
            <ul className="dropdown-menu ms-auto me-auto">
              <li>
                <NavLink className="dropdown-item" to="/changeUsername">
                  Change username
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/changeEmail">
                  Change email
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/changePassword">
                  Change password
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/">
                  Logout
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navigation;
