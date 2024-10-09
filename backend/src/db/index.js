import mongoose from "mongoose";
import express from 'express';

import { DB_NAME } from "../constants.js";


const connectDb = async() => {
     try{
       const connectionInstance =  await mongoose.connect(`mongodb+srv://sazid:rgs0009937@sazid.zpobs.mongodb.net/${DB_NAME}`)
       console.log('MONGODB connection !! DB HOST :: ',connectionInstance.connection.host)
    }
    catch(error){
        console.log("MONGO connnection error ",error);
        process.exit(1)

    }
}

export default connectDb