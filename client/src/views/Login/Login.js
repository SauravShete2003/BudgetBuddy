import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
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
      toast.success(response.data.message);
      localStorage.setItem("currentUser", JSON.stringify(response.data.data));
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      toast.error(response.data.message);
    }
    console.log(response);
  };

  return (
    <div className="auth-container" style={{margin : "90px auto"}}>
        <h1 className="auth-heading">User Login</h1>
          <div className="auth-input-container">
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
            <button type="button" onClick={login} className="auth-btn">
              Login
            </button>
            <Link to="/signup" className="auth-link">
              Don`t have a account ? Signup
            </Link>
          </div>
      <Toaster />
    </div>
  );
}

export default Login;
