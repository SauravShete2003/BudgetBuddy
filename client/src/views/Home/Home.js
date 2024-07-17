import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./Home.css";
import TransactionCard from "../../components/TransactionCard/TransactionCard";
import addImg from './wallet.png'

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

  const loadTransactions = async () => {
    if (!user._id) {
      return;
    }
    toast.loading("Transaction loading...");
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/transactions?userId=${user._id}`
    );
    toast.dismiss();
    setTransactions(response.data.data);
  };

  useEffect(() => {
    loadTransactions();
  }, [user]);

  useEffect(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "credit") {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
    });
    setNetIncome(income);
    setNetExpense(expense);
  }, [transactions]);

  return (
    <>
      <div className="home-container">
        <span className="home-heading">
          Welcome {user.fullName} To Budget Buddy...🩷
        </span>
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
          LogOut
        </span>
        <div className="transaction-details-container">
          <div className="transaction-details-item" style={{ color: "green" }}>
            <span className="transaction-details">Net Income</span>
            <span className="transaction-title" style={{ color: "white" }}>{netIncome}</span>
          </div>
          <div className="transaction-details-item" style={{ color: "white" }}>
            <span className="transaction-details">Net Balance</span>
            <span className="transaction-title" style={{ color: "white" }}>{netIncome - netExpense}</span>
          </div>
          <div className="transaction-details-item" style={{ color: "red" }}>
            <span className="transaction-details">Net Expense</span>
            <span className="transaction-title" style={{ color: "white" }}>{netExpense}</span>
          </div>
        </div>
        <div className="transaction">
        {transactions.map((object) => {
          const { title, _id, amount, category, type, createdAt } = object;
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
        <img src={addImg} className="add-img"/>
        <Toaster />
      </div>
    </>
  );
}

export default Home;
