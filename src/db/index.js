import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected!!`);
        console.log(`${connectionInstance.connection.host }`);
    } catch (error) {
        console.log("ERROR in mongoDB ",error)
        process.exit(1)
    }
}

export default connectDB