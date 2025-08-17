import joi from "joi"
import { generalRules } from "../../utils/generalRules/index.js"


export const borrowBookSchema = {
    body: joi.object({
        userId: generalRules.id.required().required(),
        bookId: generalRules.id.required().required(), 
    }).required(),
}