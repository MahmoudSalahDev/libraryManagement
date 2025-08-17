import bookModel from "../../DB/models/book.model.js";

export const addBook = async (req, res, next) => {
    const { title, author, publishedYear, availableCopies } = req.body;



    const existingBook = await bookModel.findOne({ title, author });
    if (existingBook) {
        // Update available copies by adding the new ones
        existingBook.availableCopies += availableCopies;
        await existingBook.save();

        return res.status(200).json({
            message: "Book already exists, updated available copies 📚",
            book: existingBook,
        });
    }



    const book = await bookModel.create({
        title,
        author,
        publishedYear,
        availableCopies,
    });



    return res.status(201).json({ message: "Book Added successfully👌", book });
};




// ============List all books ==================
export const listBooks = async (req, res, next) => {

    const { sortBy = "title", order = "asc" } = req.query;


    const validSortFields = ["title", "publishedYear"];
    const sortField = validSortFields.includes(sortBy) ? sortBy : "title";


    const sortOrder = order.toLowerCase() === "desc" ? -1 : 1;

    const books = await bookModel.find().sort({ [sortField]: sortOrder });

    return res.status(200).json({
        message: "Books fetched successfully 📚",
        count: books.length,
        books,
    });
};



export const updateBook = async (req, res, next) => {
    const { id } = req.params;


    const updatedBook = await bookModel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
    );

    if (!updatedBook) {
        throw new Error("Book not found !!", { cause: 404 })
    }

    return res.status(200).json({
        message: "Book updated successfully ✅",
        book: updatedBook,
    });
};




export const deleteBook = async (req, res, next) => {

    const { id } = req.params;

    const deletedBook = await bookModel.findByIdAndDelete(id);

    if (!deletedBook) {
        throw new Error("Book not found !!", { cause: 404 })
    }

    return res.status(200).json({
        message: "Book deleted successfully 🗑️",
        book: deletedBook,
    });
};
