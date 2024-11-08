import React, { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./Home.css";
import TransactionCard from "../../components/TransactionCard/TransactionCard";
import addImg from "./add.png";
import { Link } from "react-router-dom";
import LogOut from "./../../components/LogOut/LogOut";

function Home() {
  const [user, setUser] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [netIncome, setNetIncome] = useState(0);
  const [netExpense, setNetExpense] = useState(0);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
    } else {
      window.location.href = "/login";
    }
  }, []);

  const loadTransactions = useCallback(async () => {
    if (!user._id) return;
    toast.loading("Transaction loading...");
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/transactions?userId=${user._id}`
    );
    toast.dismiss();
    setTransactions(response.data.data);
  }, [user._id]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  useEffect(() => {
    let income = 0;
    let expense = 0;
    transactions?.forEach(({ type, amount }) => {
      if (type === "credit") {
        income += amount;
      } else {
        expense += amount;
      }
    });
    setNetIncome(income);
    setNetExpense(expense);
  }, [transactions]);

  return (
    <>
      <div className="home-container">
        <h1 className="home-heading">
          Welcome, {user.fullName ? user.fullName.substring(0, 6) : "No Name"}{" "}
          to Budget Buddy...🩷
        </h1>
        <span
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            toast.success("Logout successfully..");
            setTimeout(() => {
              window.location.href = "/login";
            }, 2000);
          }}
        >
          <LogOut />
        </span>

        <div className="transaction-details-container">
          <div className="transaction-details-item" style={{ color: "green" }}>
            <span className="transaction-details">Net Income</span>
            <span className="transaction-heading">{netIncome}</span>
          </div>
          <div className="transaction-details-item">
            <span className="transaction-details">Net Balance</span>
            <span className="transaction-heading">
              {netIncome - netExpense}
            </span>
          </div>
          <div className="transaction-details-item" style={{ color: "red" }}>
            <span className="transaction-details">Net Expense</span>
            <span className="transaction-heading">{netExpense}</span>
          </div>
        </div>
        <div className="transaction">
          {transactions?.map((object) => {
            const {_id , title , amount ,category,type,createdAt} = object
            return (
              <TransactionCard
                key={_id}
                _id={_id}
                title={title}
                amount={amount}
                category={category}
                type={type}
                createdAt={createdAt}
                loadTransactions={loadTransactions}
              />
            );
          })}
        </div>

        <Link to={"/add"}>
          <img src={addImg} className="add-img" alt="" />
        </Link>
        <Toaster />
      </div>
    </>
  );
}

export default Home;
