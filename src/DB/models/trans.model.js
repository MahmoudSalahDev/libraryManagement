import mongoose from "mongoose";


export const statusRole = {
    returned: "returned",
    borrowed: "borrowed",
}


const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    borrowDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    returnDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: Object.values(statusRole),
        required: true
    },

}, {
    timestamps: true
});



const transactionModel = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema)


export default transactionModel