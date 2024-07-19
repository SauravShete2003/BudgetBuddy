import { query } from "express";
import Transaction from "../model/Transaction.js";
import User from "../model/User.js";

const postTransaction = async (req, res) => {
  const { amount, category, type, user, title } = req.body;
  const newTransaction = new Transaction({
    title,
    amount,
    category,
    type,
    user,
  });
  try {
    await newTransaction.save();
    res.json({
      success: true,
      message: "Transaction created successfully",
      data: newTransaction,
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Transaction not created",
      data: err,
    });
  }
};

const getTransactions = async (req, res) => {
  const { userId } = req.query;

  console.log(userId);
  const user = await User.findById(userId);

  if (!user) {
    return res.json({
      success: false,
      message: "User not found",
      data: null,
    });
  }
  const transactions = await Transaction.find({ user: userId }).sort({
    createdAt: -1,
  });
  res.json({
    success: true,
    message: "Transactions fetched successfully",
    data: transactions,
  });
};
const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  await Transaction.deleteOne({ _id: id });
  res.json({
    success: true,
    message: "Transaction deleted successfully",
    data: null,
  });
};
export { postTransaction, getTransactions, deleteTransaction };
