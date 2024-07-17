import React from "react";
import "./TransactionCard.css";
import axios from "axios";
import toast,{Toaster}from "react-hot-toast";

function TransactionCard ({ _id, title, amount, category, type, createdAt, loadTransactions }) {
  const deleteTransaction = async () => {
   const response = await axios.delete( `${process.env.REACT_APP_API_URL}/transaction/${_id}`)
   toast.success(response.data.message)
   loadTransactions()

  return (
    <div className="transaction-card">
      <span className="transaction-title">{title}</span>
      <span className="transaction-date">{new Date(createdAt).toLocaleString()}</span>
      <span className={`transaction-amount transaction-type-${type}`}>
        {type === "credit" ? `+${amount}` : `-${amount}`}
      </span>
      <span className="transaction-category">{category}</span>
      <button
       type="button" 
       className="delete-btn"
       onClick={deleteTransaction}
       >Delete</button>
       <Toaster/>
    </div>
  );
  }
}

export default TransactionCard;
