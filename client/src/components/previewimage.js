import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const PreviewImage = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const fetchImages = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/images", {
        withCredentials: true,
      });
      setImages(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch images.");
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
      setImages((prev) => prev.filter((img) => img.filename !== filename));
    } catch {
      alert("Failed to delete image.");
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const filteredImages = images.filter(
    (img) =>
      img.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Uploaded Images</h2>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search images by filename or title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <p>Loading images...</p>
      ) : filteredImages.length > 0 ? (
        <div className="row mt-4">
          {filteredImages.map(({ filename, title }) => (
            <div key={filename} className="col-md-4 mb-3">
              <div className="card">
                <img
                  src={`http://localhost:5000/uploads/${filename}`}
                  alt={title}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "200px", cursor: "pointer" }}
                  onClick={() => setSelectedImage({ filename, title })}
                />
                <div className="card-body text-center">
                  <p className="mb-1 fw-bold">{title}</p>
                  <p className="text-muted small">{filename}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(filename)}
                    disabled={deleting === filename}
                  >
                    {deleting === filename ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No images found.</p>
      )}

      <Modal
        show={!!selectedImage}
        onHide={() => setSelectedImage(null)}
        size="lg"
        centered
      >
        <Modal.Header closeButton className="justify-content-center">
          <Modal.Title className="text-center w-100">{selectedImage?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={`http://localhost:5000/uploads/${selectedImage?.filename}`}
            alt={selectedImage?.title}
            style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setSelectedImage(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PreviewImage;