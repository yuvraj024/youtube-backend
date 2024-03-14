import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
// json data kelie
app.use(express.json({limit:"16kb"}))
// pehle body-parser use krte the
app.use(express.urlencoded({extended:true,limit:"16kb"}))
// url me jo encoding aajati h usko accept krane kelie
app.use(express.static("public"))
// server me temp storage isme krado images and all store
app.use(cookieParser())


//routes import
import userRouter from "./routes/user.routes.js"

//routes declaration
app.use("/api/v1/users",userRouter)
// http://localhost:8000/api/v1/users/register

export {app}