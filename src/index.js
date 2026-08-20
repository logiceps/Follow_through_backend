import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js"; 
import app from "./app.js";
dotenv.config({
    path: "./.env"
});

connectDB();
then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((err)=>{
    console.error("Error connecting to the database:", err);
    process.exit(1);
});



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
