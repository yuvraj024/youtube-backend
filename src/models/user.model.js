import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true  //optimised way me searchable hojata hai , thoda cost leta hai
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,   //cloudinary url
        required:true,
    },
    coverImage:{
        type:String,   //cloudinary url
    },
    watchHistory:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }
    ],
    password:{
        type:String,
        required:[true,'Password is required!']
    },
    refreshToken:{
        type:String
    }
},{timestamps:true}) 


/*schema pr hook/middleware lgadia pre mtlb jse hi save horha ho usse just pehle encrypt krado password
pura function likhege kuki arrow function ke pass this ka reference nhi hota*/
userSchema.pre("save",async function(next){
    // check ki pass hua h chnge ya nhi
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10)
    next()
})
// custom method in model to check password corect or not
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this.id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this.id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User=mongoose.model("User",userSchema)