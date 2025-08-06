import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(true);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [capsLockCurrent, setCapsLockCurrent] = useState(false);
  const [capsLockNew, setCapsLockNew] = useState(false);
  const [capsLockConfirm, setCapsLockConfirm] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "current") setShowCurrentPassword((prev) => !prev);
    if (field === "new") setShowNewPassword((prev) => !prev);
    if (field === "confirm") setShowConfirmPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCapsLock = (field, e) => {
    const isCapsOn = e.getModifierState && e.getModifierState("CapsLock");
    if (field === "current") setCapsLockCurrent(isCapsOn);
    if (field === "new") setCapsLockNew(isCapsOn);
    if (field === "confirm") setCapsLockConfirm(isCapsOn);
  };

  useEffect(() => {
    const fetchEmail = async () => {
      const userId = localStorage.getItem("user_id");
      if (!userId) return;

      try {
        const res = await axios.get(`http://localhost:5000/user/${userId}`, {
          withCredentials: true,
        });
        setEmail(res.data.email);
      } catch (err) {
        setError("Failed to fetch email.");
      } finally {
        setLoadingEmail(false);
      }
    };

    fetchEmail();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatusMessage("");

    if (form.newPassword !== form.confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (form.newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/change-password",
        {
          current_password: form.currentPassword,
          new_password: form.newPassword,
        },
        { withCredentials: true }
      );

      setStatusMessage(res.data.message);
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to change password.");
    }
  };

  const CapsLockWarning = ({ isOn }) =>
    isOn ? (
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
    ) : null;

  return (
    <div className="container col-md-4 card py-4 mt-5">
      <h3>Profile</h3>
      <p>
        <strong>Email:</strong> {loadingEmail ? "Loading..." : email}
      </p>

      <form onSubmit={handleSubmit}>

        <div className="mb-3" style={{ position: "relative" }}>
          <label>Current Password</label>
          <div className="input-group">
            <input
              type={showCurrentPassword ? "text" : "password"}
              name="currentPassword"
              className="form-control"
              value={form.currentPassword}
              onChange={handleChange}
              onKeyDown={(e) => handleCapsLock("current", e)}
              onKeyUp={(e) => handleCapsLock("current", e)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => togglePasswordVisibility("current")}
              tabIndex={-1}
            >
              <i className={`bi ${showCurrentPassword ? "bi-eye-slash" : "bi-eye"}`} />
            </button>
          </div>
          <CapsLockWarning isOn={capsLockCurrent} />
        </div>

        <div className="mb-3" style={{ position: "relative" }}>
          <label>New Password</label>
          <div className="input-group">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              className="form-control"
              value={form.newPassword}
              onChange={handleChange}
              onKeyDown={(e) => handleCapsLock("new", e)}
              onKeyUp={(e) => handleCapsLock("new", e)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => togglePasswordVisibility("new")}
              tabIndex={-1}
            >
              <i className={`bi ${showNewPassword ? "bi-eye-slash" : "bi-eye"}`} />
            </button>
          </div>
          <CapsLockWarning isOn={capsLockNew} />
        </div>

        <div className="mb-3" style={{ position: "relative" }}>
          <label>Confirm New Password</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmNewPassword"
              className="form-control"
              value={form.confirmNewPassword}
              onChange={handleChange}
              onKeyDown={(e) => handleCapsLock("confirm", e)}
              onKeyUp={(e) => handleCapsLock("confirm", e)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => togglePasswordVisibility("confirm")}
              tabIndex={-1}
            >
              <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`} />
            </button>
          </div>
          <CapsLockWarning isOn={capsLockConfirm} />
        </div>

        {error && <div className="text-danger mb-2">{error}</div>}
        {statusMessage && <div className="text-success mb-2">{statusMessage}</div>}

        <button type="submit" className="btn btn-primary col-12">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default Profile;