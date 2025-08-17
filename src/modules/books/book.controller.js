import { Router } from "express";
import * as BS from "./book.service.js";
import * as BV from "./book.validation.js";
import { validation } from "../../middleware/validation.js";
import { authentication } from "../../middleware/authentication.js";






const bookRouter = Router();

bookRouter.post("/", authentication,
    validation(BV.addBookSchema),
    BS.addBook);


bookRouter.get(
    "/",
    authentication,
    BS.listBooks
);


bookRouter.put(
    "/:id",
    authentication,
    validation(BV.updateBookSchema),
    BS.updateBook
);


bookRouter.delete(
    "/:id",
    authentication, 
    BS.deleteBook
);

export default bookRouter;