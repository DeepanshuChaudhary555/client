import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{ backgroundColor: "#161616" }}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/home">
          NTCC Year 2
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
              <NavLink className="nav-link" to="/previewimage">
                Uploaded Images
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/uploadimage">
                Upload New Images
              </NavLink>
            </li>
            <li className="nav-item dropdown ">
              <a
                className="nav-link dropdown-toggle"
                to="#"
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
                  <NavLink className="dropdown-item" to="/">
                    Logout
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>

          <form className="d-flex ms-auto" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Images"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              <i class="bx bx-search"></i>
            </button>
          </form>

          <button
            className="btn btn-secondary ms-3"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <i class="bx  bx-sun-bright"></i>
            ) : (
              <i class="bx  bx-moon-star"></i>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
