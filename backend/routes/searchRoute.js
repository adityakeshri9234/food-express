import express from "express"
import { searchFood } from "../controllers/searchController.js";

const searchRouter=express.Router();

searchRouter.get('/food',searchFood)
export default searchRouter