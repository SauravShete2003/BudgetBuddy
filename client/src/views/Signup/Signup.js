import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
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
      <div className="form-container">
        <h1 className="auth-heading">User Registration</h1>
        <form className="auth-form">
          <div className="form-group">
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
            <button
              type="button"
              onClick={signup}
              className="auth-btn"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <div className="auth-img-container">
        <img
          src="https://media.istockphoto.com/id/1342226806/photo/mobile-phone-app-for-money-budget-and-expense-tracking.jpg?s=612x612&w=0&k=20&c=FFp9jyIJotg1pgMQnSlcQWz5XO6CpkLnR6VvKrYTcnQ="
          className="auth-img"
          alt="Signup Illustration"
        />
      </div>
      <Toaster />
    </div>
  );
}

export default Signup;
