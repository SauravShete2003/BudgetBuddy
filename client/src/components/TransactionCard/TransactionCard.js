import React from "react";
import "./TransactionCard.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function TransactionCategory({ category }) {
  const CATEGORY_STYLE = {
    shopping: { bgColor: "#FFD700" },
    food: { bgColor: "#FFA07A" },
    rent: { bgColor: "#D3D3D3" },
    salary: { bgColor: "#87CEEB" },
    learning: { bgColor: "#FFD700" },
    health: { bgColor: "#98FB98" },
  };
  const { bgColor = "#ccc" } = CATEGORY_STYLE[category] || {};
  return (
    <div className="transaction-category" style={{ backgroundColor: bgColor }}>
      <span>{category}</span>
    </div>
  );
}

function TransactionCard({
  _id,
  title,
  amount,
  category,
  type,
  createdAt,
  loadTransactions,
}) {
  const deleteTransaction = async () => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/transaction/${_id}`
    );
    toast.success(response.data.message);
    loadTransactions();
  };
  return (
    <div className="transaction-card">
      <span className="transaction-title">{title}</span>
      <span className="transaction-date">
        {new Date(createdAt).toLocaleString()}
      </span>
      <span className={`transaction-amount transaction-type-${type}`}>
        {type === "credit" ? `+ ${amount}` : `- ${amount}`}
      </span>
      <TransactionCategory category={category} />
      <button type="button" className="delete-btn" onClick={deleteTransaction}>
        Delete
      </button>
      <Toaster />
    </div>
  );
}

export default TransactionCard;
