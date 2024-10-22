import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [user, SetUser] = useState({
    fullName: "",
    email: "",
    password: "",
    address: "",
  });

  const signup = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/signup`,
      {
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        address: user.address,
      }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      SetUser({
        fullName: "",
        email: "",
        password: "",
        address: "",
      });
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-heading">User Registration</h1>
      <form className="">
        <div>
          <input
            type="text"
            placeholder="Enter Name"
            className="input-box"
            value={user.fullName}
            onChange={(e) => {
              SetUser({ ...user, fullName: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Enter Email"
            className="input-box"
            value={user.email}
            onChange={(e) => {
              SetUser({ ...user, email: e.target.value });
            }}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="input-box"
            value={user.password}
            onChange={(e) => {
              SetUser({ ...user, password: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Address"
            className="input-box"
            value={user.address}
            onChange={(e) => {
              SetUser({ ...user, address: e.target.value });
            }}
          />
          <button type="button" onClick={signup} className="auth-btn">
            Register
          </button>
          <br />
          <Link to="/login" className="auth-link">
            Already have an account? Login
          </Link>
        </div>
      </form>

      <Toaster />
    </div>
  );
}

export default Signup;
