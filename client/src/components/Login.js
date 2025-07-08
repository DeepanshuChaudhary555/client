import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div className="container py-3"></div>
      <div className="container col-md-4 card rounded-7 me-lg-n5 py-3">
        <h3>Sign In</h3>
        <form>
          <div className="row">
            <div className="mb-3 col-sm-12">
              <label for="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleinputemail2"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label for="password" className="form-label">
                Password
              </label>
              <input type="password" id="password" className="form-control" />
            </div>
            <div className="mb-3">
              <button
                to="/home"
                type="submit"
                class="btn btn-outline-primary col-12"
              >
                Login
              </button>
            </div>
          </div>
        </form>
        <div className="signUp">
          <p>
            Don't have an account?{" "}
            <Link to="/" type="submit" className="">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
