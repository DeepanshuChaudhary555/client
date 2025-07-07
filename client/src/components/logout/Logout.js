import React from 'react'
import './logout.css';
import { Link } from 'react-router-dom';


const Logout = () => {
  return (
    <div className="logout">
        <h3>To logout click here</h3>
        <Link to="/" className="btn btn-outline-danger">Logout</Link>
    </div>
  )
}

export default Logout;