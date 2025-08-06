import React, { useEffect, useState } from "react";
import axios from "axios";

const PreviewImage = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null); // track deleting image filename

  const fetchImages = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/images", {
        withCredentials: true,
      });
      setImages(res.data);
    } catch (err) {
      const errMsg = err.response?.data?.error || "Failed to fetch images.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (filename) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    setDeleting(filename);
    try {
      await axios.post(
        "http://localhost:5000/delete-image",
        { filename },
        { withCredentials: true }
      );
      setImages((prev) => prev.filter((img) => img !== filename));
    } catch (err) {
      alert("Failed to delete image.");
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Uploaded Images</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <p>Loading images...</p>
      ) : images.length > 0 ? (
        <div className="row mt-4">
          {images.map((img) => (
            <div key={img} className="col-md-4 mb-3">
              <div className="card">
                <img
                  src={`http://localhost:5000/uploads/${img}`}
                  alt="Uploaded"
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body text-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(img)}
                    disabled={deleting === img}
                  >
                    {deleting === img ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No images uploaded yet.</p>
      )}
    </div>
  );
};

export default PreviewImage;