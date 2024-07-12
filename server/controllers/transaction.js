import Transaction from '../model/Transaction.js'

const postTransaction = async (req , res) =>{
    const {amount , category , type , user , title} =req.body;
    const newTransaction = new Transaction({title , amount , category , type , user});
    try{
        await newTransaction.save();
        res.json({
            success : true,
            message:"Transaction created successfully",
            data:newTransaction  
        })
        
    }
    catch(err){
        res.json({
            success : false,
            message:"Transaction not created",
            data:err
        })
    }
}

export {
    postTransaction
}