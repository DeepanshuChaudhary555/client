import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.confirm("Are you sure you want to logout?")) {
      navigate("/home");
      return;
    }

    const logout = async () => {
      try {
        await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
        localStorage.removeItem("user_id");
        navigate("/login");
      } catch (err) {
        console.error("Logout failed:", err);
        navigate("/login");
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="logout container text-center mt-5">
      <h3>Logging out...</h3>
    </div>
  );
};

export default Logout;