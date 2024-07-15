import axios from "axios";
import React, { useState } from "react";
import "./Login.css";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
   
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          email: user.email,
          password: user.password,
        }
      );
      if (response.data.success) {
        setUser({
          email: "",
          password: "",
        });
        toast.success("Login successful!");
        setTimeout(() => {
          window.location.href = '/';
      }, 2000); 
      }else {
        toast.error(response.data.message);
      }
    console.log(response)
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h1 className="auth-heading">User Login</h1>
        <form className="login-form">
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            className="input-box"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="input-box"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
          <button
            type="button"
            onClick={login}
            className="login-btn"
          >
            Login
          </button>
        </form>
      </div>
      <div className="login-img-container">
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

export default Login;
