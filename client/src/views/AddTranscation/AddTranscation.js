import "./AddTranscation.css";
import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function AddTranscation() {
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("credit");
  const [category, setCategory] = useState("");

  const AddTranscation = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/transaction`,
      {
        amount,
        type,
        category,
        title,
        user: user._id,
      }
    );
    toast.success(response.data.message);
    console.log(response);

    setAmount(0);
    setTitle("");
    setType("credit");
    setCategory("learning");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
    } else {
      window.location.href = "/login";
    }
  }, []);
  return (
    <div className="auth-container">
      <h1 className="auth-heading"> Add transcation for {user.fullName}</h1>
      <div className="auth-input-container">
        <input
          type="text"
          placeholder="Enter title"
          name="title"
          className="input-box"
          value={title}
          onChange={(e) => setTitle(e.target.value)}/>
        <input
          type="number"
          placeholder="Enter amount"
          name="amount"
          className="input-box"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}/>
        <select
          className="input-box auth-option"
          value={type}
          onChange={(e) => setType(e.target.value)}>
          <option value="credit">Income</option>
          <option value="debit">Expense</option>
        </select>

        <select
          className="input-box auth-option"
          value={category}
          onChange={(e) => setCategory(e.target.value)}>
          <option value="shopping">Shopping</option>
          <option value="food"> Food </option>
          <option value="rent"> Rent </option>
          <option value="salary"> Salary </option>
          <option value="learning"> Learning </option>
          <option value="health"> Health </option>
        </select>
        <button
          className="auth-btn"
          type="button"
          onClick={AddTranscation}
          style={{ marginTop: "15px" }}>
          Add
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default AddTranscation;
