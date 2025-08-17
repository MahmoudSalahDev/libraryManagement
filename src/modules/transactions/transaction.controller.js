import { Router } from "express";
import * as TS from "./transaction.service.js";
import * as TV from "./transaction.validation.js";
import { validation } from "../../middleware/validation.js";
import { authentication } from "../../middleware/authentication.js";



const transactionRouter = Router();

transactionRouter.post(
    "/borrow",
    authentication,
    validation(TV.borrowBookSchema),
    TS.borrowBook
);


transactionRouter.put(
    "/return/:id",
    authentication,
    TS.returnBook
);

transactionRouter.get(
    "/user",
    authentication,
    TS.getUserTransactions
);

export default transactionRouter;