import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const mongoDBURl = process.env.MONGODBCONNECTIONSTRING

const ConnectDB  =async ()=>{
    try {
        const connection  = await mongoose.connect(mongoDBURl)
        console.log("MongoDB Connecting Successfull")
    } catch (error) {
        console.log(error);
    }
}

export default ConnectDB