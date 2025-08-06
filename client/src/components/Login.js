import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        {
          email: form.email,
          password: form.password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.user_id) {
        localStorage.setItem("user_id", res.data.user_id);
        navigate("/home");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  const isFormValid = form.email.trim() && form.password.trim();

  return (
    <div className="container col-md-4 card py-4 mt-5">
      <h3 className="text-center">Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <div className="input-group">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={togglePassword}
              tabIndex={-1}
            >
              <i className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`} />
            </button>
          </div>
        </div>

        {error && <div className="text-danger text-center mb-2">{error}</div>}

        <button
          type="submit"
          className="btn btn-primary col-12"
          disabled={!isFormValid}
        >
          Login
        </button>
      </form>

      <p className="mt-3 text-center">
        Don&apos;t have an account? <Link to="/">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;