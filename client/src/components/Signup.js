import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="addUser">
        <h3>Sign Up</h3>
        <form className="addUserForm">
            <div className="inputGroup">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Enter your username" autoComplete="off"/>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" autoComplete="off"/>
                <label htmlFor="username">Paassword</label>
                <input type="password" id="password" placeholder="Enter your password" autoComplete="off"/>
                <Link to="/login" type="submit" class="btn btn-outline-primary">Sign Up</Link>
            </div>
        </form>
        <div className="login">
            <p>Already have an account?</p>
            <Link to="/login" type="submit" class="btn btn-outline-primary">Login</Link>
        </div>
    </div>
  )
}

export default Signup;