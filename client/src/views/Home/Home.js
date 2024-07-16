import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./Home.css";
import TransactionCard from "../../components/TransactionCard/TransactionCard";
function Home() {
  const [user, setUser] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [netIncome , setNetIncome] = useState(0);
  const [netExpense , setNetExpense]= useState(0)

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
    }
    if (!currentUser) {
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
  return (
    <>
      <div>
        <span className="home-heading">
          Welcome {user.fullName} To Budget Buddy🩷
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
        <div className="transaction-details-conatiner">
          <div className="transaction-details-item">
            <span className="transaction-details">{netIncome}</span>
            <br />
            <span className="transaction-details">Net Income</span>
          </div>

          <div className="transaction-details-item">
            <span className="transaction-details">+ totalCreadit</span>
            <br />
            <span className="transaction-title">{netIncome - netExpense}</span>
          </div>

          <div className="transaction-details-item">
            <span className="transaction-details">+totalCreadit</span>
            <br />
            <span className="transaction-title">{netExpense}</span>
          </div>
        </div>
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
        <Toaster />
      </div>
    </>
  );
}

export default Home;
