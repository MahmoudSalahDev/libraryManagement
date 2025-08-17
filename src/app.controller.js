import checkConnectionDB from "./DB/connectionDB.js"
import { globalErrorHandling } from "./middleware/globalErrorHandling.js"
import bookRouter from "./modules/books/book.controller.js"
import transactionRouter from "./modules/transactions/transaction.controller.js"
import userRouter from "./modules/users/user.controller.js"




const bootstrap = (app, express) => {

    app.use(express.json())

    checkConnectionDB()


    app.use("/users", userRouter)
    app.use("/books", bookRouter)
    app.use("/transactions", transactionRouter)

    app.use("{/*demo}", (req, res, next) => {
        throw new Error(`404 Url not found ${req.originalUrl}`, { cause: 404 })
    })

    app.use(globalErrorHandling)
}

export default bootstrap