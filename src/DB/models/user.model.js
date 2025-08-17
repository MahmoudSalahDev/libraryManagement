import mongoose from "mongoose";


export const userRole = {
    member: "member",
    admin: "admin",
}


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(userRole),
        default: "member",
        required: true
    },

}, {
    timestamps: true
});



const userModel = mongoose.models.User || mongoose.model("User", userSchema)


export default userModel