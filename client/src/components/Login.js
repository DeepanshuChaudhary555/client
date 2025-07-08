import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="addUser">
        <h3>Sign In</h3>
        <form className="addUserForm">
            <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" autoComplete="off"/>
                <label htmlFor="username">Password</label>
                <input type="password" id="password" placeholder="Enter your password" autoComplete="off"/>
                <Link to="/home" type="submit" class="btn btn-outline-primary">Login</Link>
            </div>
        </form>
        <div className="signUp">
            <p>Don't have an account?</p>
            <Link to="/" type="submit" class="btn btn-outline-primary">Sign Up</Link>
        </div>
    </div>
  )
}

export default Login;