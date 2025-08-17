import bookModel from "../../DB/models/book.model.js";
import transactionModel, { statusRole } from "../../DB/models/trans.model.js";

export const borrowBook = async (req, res, next) => {

    const { userId, bookId } = req.body;

    // Check if book exists
    const book = await bookModel.findById(bookId);
    if (!book) {
        throw new Error("Book not found !!", { cause: 404 })
    }

    // Check if at least 1 copy is available
    if (book.availableCopies < 1) {
        throw new Error("No copies available !!", { cause: 404 })
    }

    // Create transaction
    const transaction = await transactionModel.create({
        userId,
        bookId,
        borrowDate: new Date(),
        status: statusRole.borrowed,
    });

    // Decrease availableCopies by 1
    book.availableCopies -= 1;
    await book.save();

    return res.status(201).json({
        message: "Book borrowed successfully ✅",
        transaction,
        book,
    });

};



export const returnBook = async (req, res, next) => {

    const { id } = req.params;

    // Find the transaction
    const transaction = await transactionModel.findById(id);
    if (!transaction) {
        throw new Error("Transaction not found !!", { cause: 404 })
    }

    // Check if already returned
    if (transaction.status === "returned") {
        throw new Error("Book already returned ⚠️", { cause: 400 })
    }

    // Update transaction
    transaction.status = statusRole.returned;
    transaction.returnDate = new Date();
    await transaction.save();

    // Increment book copies
    const book = await bookModel.findById(transaction.bookId);
    if (book) {
        book.availableCopies += 1;
        await book.save();
    }

    return res.status(200).json({
        message: "Book returned successfully ✅",
        transaction,
        book,
    });

};



export const getUserTransactions = async (req, res, next) => {
    const userId = req.user._id;

    const transactions = await transactionModel
        .find({ userId })
        .populate("bookId", "title author publishedYear") 
        .sort({ borrowDate: -1 });

    return res.status(200).json({
        message: "User transactions fetched successfully 📚",
        count: transactions.length,
        transactions,
    });

};
