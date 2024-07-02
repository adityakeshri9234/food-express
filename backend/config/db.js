import mongoose, { connect } from "mongoose";
export const connectDB =async()=>{
    await mongoose.connect('mongodb+srv://adityakeshriofficial123:2ZZMw9QBleWxUqbj@cluster0.akb3rya.mongodb.net/food-express')
    .then(()=>console.log("db connected"))
}