import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({

    email: { type: String, required: true },
    password: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
})

const User = mongoose.model('User', userSchema);

export default User;