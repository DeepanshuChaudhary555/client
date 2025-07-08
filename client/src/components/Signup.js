import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <div className="container py-3"></div>
      <div className="container col-md-4 card rounded-7 me-lg-n5 py-3">
        <h3>Sign Up</h3>
        <form>
          <div className="row">
            <div className="mb-3 col-sm-12">
              <label for="username" className="form-label">
                Username
              </label>
              <input
                type="username"
                className="form-control"
                id="username"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-sm-12">
              <label for="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
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
              <input type="password" className="form-control" id="password" />
            </div>

            <div className="mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" for="exampleCheck1">
                  Terms and Conditions
                </label>
              </div>
            </div>
            <div className="mb-3">
              <button
                to="/login"
                type="submit"
                className="btn btn-outline-primary col-12"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
        <div className="login">
          <p>
            Already have an account?{" "}
            <Link to="/login" type="submit" className="">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
