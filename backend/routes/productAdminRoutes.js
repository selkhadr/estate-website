const express = require("express");
const Product = require("../models/Product");
const {protect, admin} = require("../middleware/authMiddleware");

const router = express.Router();

//get /api/admin/products
//get all products (admin only)
//private/admin
router.get("/", protect,admin,async(req,res)=>{
    try{
        const products = await Product.find({});
        res.json(products);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"server error"});
    }
})