import express, { json } from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv, { config } from "dotenv"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors());
const PORT = process.env.PORT || 5000


const connectDB = async ()=>{
    const conn = await mongoose.connect(process.env.MONGO_URL)
    if(conn){
        console.log("MongoDB connected✅")
    }
}
connectDB();

app.get('/',(req , res)=>{
    res.json({
        message:"Welcome to the API"
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})