import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [capsLockPassword, setCapsLockPassword] = useState(false);
  const [capsLockConfirm, setCapsLockConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleCapsLock = (e, field) => {
    const isCapsOn = e.getModifierState && e.getModifierState("CapsLock");
    if (field === "password") setCapsLockPassword(isCapsOn);
    if (field === "confirmPassword") setCapsLockConfirm(isCapsOn);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerMessage("");

    const newErrors = {};

    if (!validateEmail(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/signup",
        {
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      );
      navigate("/login");
    } catch (err) {
      setServerMessage("Signup failed. Email already in use.");
    }
  };

  return (
    <div className="container col-md-4 card py-4 mt-5">
      <h3 className="text-center">Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Password</label>
          <div className="input-group" style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="off"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              value={form.password}
              onChange={handleChange}
              onKeyDown={(e) => handleCapsLock(e, "password")}
              onKeyUp={(e) => handleCapsLock(e, "password")}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={togglePassword}
              tabIndex={-1}
            >
              <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
            </button>
            {capsLockPassword && (
              <small
                style={{
                  color: "orange",
                  position: "absolute",
                  right: "50px",
                  top: "100%",
                  userSelect: "none",
                  marginBottom: "8px",
                  marginTop: "4px",
                }}
              >
                Caps Lock is ON
              </small>
            )}
          </div>
          {errors.password && (
            <div className="invalid-feedback d-block">{errors.password}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Confirm Password</label>
          <div className="input-group" style={{ position: "relative" }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              autoComplete="off"
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              value={form.confirmPassword}
              onChange={handleChange}
              onKeyDown={(e) => handleCapsLock(e, "confirmPassword")}
              onKeyUp={(e) => handleCapsLock(e, "confirmPassword")}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={toggleConfirmPassword}
              tabIndex={-1}
            >
              <i
                className={`bi ${
                  showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                }`}
              />
            </button>
            {capsLockConfirm && (
              <small
                style={{
                  color: "orange",
                  position: "absolute",
                  right: "50px",
                  top: "100%",
                  userSelect: "none",
                }}
              >
                Caps Lock is ON
              </small>
            )}
          </div>
          {errors.confirmPassword && (
            <div className="invalid-feedback d-block">
              {errors.confirmPassword}
            </div>
          )}
        </div>

        {serverMessage && (
          <div className="text-danger text-center mb-3">{serverMessage}</div>
        )}

        <button type="submit" className="btn btn-primary col-12">
          Sign Up
        </button>
      </form>

      <p className="mt-3 text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;