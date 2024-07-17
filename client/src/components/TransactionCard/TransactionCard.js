import React from "react";
import "./TransactionCard.css";

function TransactionCard({ _id, title, amount, category, type, createdAt, loadTransactions }) {
  return (
    <div className="transaction-card">
      <span className="transaction-title">{title}</span>
      <span className="transaction-date">{new Date(createdAt).toLocaleString()}</span>
      <span className={`transaction-amount transaction-type-${type}`}>
        {type === "credit" ? `+${amount}` : `-${amount}`}
      </span>
      <span className="transaction-category">{category}</span>
    </div>
  );
}

export default TransactionCard;
