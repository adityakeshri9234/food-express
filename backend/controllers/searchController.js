import foodModel from "../models/foodModel.js";
import fs from 'fs';

const searchFood=async (req,res)=>{
    
    
    try{
        const foods=await foodModel.find({name:req.query.query});
        res.json({success:true,data:foods})
        
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})
    }
}
export {searchFood}