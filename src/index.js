// require('dotenv').config()
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";


dotenv.config()
const PORT=process.env.PORT || 8000
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error agya baba:",error);
        throw error;
    })
    app.listen(PORT,()=>{
        console.log(`Server is running at port: ${PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO DB CONNECTION FAILED:" ,err);
})


/*
import express from "express";
const app=express()

;( async() =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERRR:",error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App i s listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR: ",error)
        throw error
    }
})()

*/