import { Schema , model } from "mongoose";

const transactionSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    amount: {
        type: Number,
        required: true
    },
   category : {
    type: String,
    default : "others"
   },
   type : {
    type: String,
    enum : ["debit" , "credit"],
   },
   user:{
    type : Schema.Types.ObjectId,
    ref : "User"
   }

},{
    timestamps : true
});
const Transaction = model("Transaction" , transactionSchema);
export default Transaction