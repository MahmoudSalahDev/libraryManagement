import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 30
    },
    author: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 30
    },
    publishedYear: {
        type: Number,
        required: true
    },
    availableCopies: {
        type: Number,
        required: true,
        default:1
    },
    

}, {
    timestamps: true
});



const bookModel = mongoose.models.Book || mongoose.model("Book", bookSchema)


export default bookModel