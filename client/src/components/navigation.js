import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.removeItem("user_id");
      navigate("/"); // or navigate("/login") if that's your login page
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{ backgroundColor: "#161616" }}
    >
      <div className="container-fluid d-flex justify-content-center align-items-center">

        <NavLink className="navbar-brand mx-3" to="/home">
          NTCC Year 2
        </NavLink>

        <button
          className="navbar-toggler mx-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse mx-3" id="navbarNavDropdown">
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item mx-2">
              <NavLink className="nav-link" to="/previewimage">
                Uploaded Images
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink className="nav-link" to="/uploadimage">
                Upload New Images
              </NavLink>
            </li>
            <li className="nav-item dropdown mx-2">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                My Account
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/profile">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <button
          className="btn btn-secondary ms-3"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <i className="bx bx-sun-bright"></i>
          ) : (
            <i className="bx bx-moon-star"></i>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;