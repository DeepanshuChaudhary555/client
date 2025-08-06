import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToUpload = () => {
    navigate('/uploadimage');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Welcome to NTCC Year 2 Image Gallery!</h1>
      <p className="lead">
        This platform lets you easily upload, view, and manage your images all in one place.
      </p>
      <ul>
        <li><strong>Upload</strong> your favorite images with titles for easy searching.</li>
        <li><strong>Browse</strong> your uploaded images anytime.</li>
        <li><strong>Search</strong> images by title or filename to quickly find what you need.</li>
        <li><strong>Delete</strong> images you no longer want to keep.</li>
        <li>Switch between light and dark mode for your comfort.</li>
      </ul>
      <p>Get started by uploading new images or exploring your gallery. Enjoy your seamless image management experience!</p>

      <button className="btn btn-primary" onClick={goToUpload}>
        Upload Images
      </button>
    </div>
  );
};

export default Home;