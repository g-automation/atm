import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
},
    { timestamps: true } //save record/update creation date
);

const User = mongoose.model('User', Schema);

export default User;