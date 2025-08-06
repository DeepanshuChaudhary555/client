import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    if (!title.trim()) {
      setMessage("Please enter a title for the image.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Image uploaded successfully!");
      setFile(null);
      setTitle(""); 
      setPreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Upload failed.";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload Image</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter image title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="form-control mb-3"
        onChange={handleFileChange}
        disabled={loading}
      />

      {preview && (
        <div className="mb-3">
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: "300px", border: "1px solid #ccc" }}
          />
        </div>
      )}

      <button
        className="btn btn-primary"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
};

export default UploadImage;