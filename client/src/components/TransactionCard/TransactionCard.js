import "./TransactionCard.css";
function TransactionCard({ title, amount, _id, type, category, createdAt }) {
  return (
    <div className="transcaction-card-container">
      <h1 className="transcaction-card-title">{title}</h1>
      <span className="transcaction-card-amount"
      style={{ color: type === "credit" ? "green" : "red" }} >
        {type === "credit" ? "+" : "-"}
        {amount}
      </span>
      <span className="transcaction-card-category">{category}</span>
      <span>
        { new Date(createdAt).toLocaleString()}
      </span>
    </div>
  );
}

export default TransactionCard;
