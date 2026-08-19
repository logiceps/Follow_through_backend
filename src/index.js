import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js"; 
dotenv.config({
    path: "./.env"
});

connectDB();



/*
import express from "express";
const app = express();
;(async ()=>{
    try{
        await mongoose.connect(`process.env.MONGODB_URI/${DB_NAME}`);
        app.on("error",(err)=>{
            console.error("Error connecting to MongoDB:", err);
            throw err;
        });
    }
    catch(err){
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
})()
*/
