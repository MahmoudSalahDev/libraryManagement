import joi from "joi"
import { Types } from "mongoose"
export const customId = (value, helper) => {
    const data = Types.ObjectId.isValid(value)
    return data ? value : helper.message("inValid Id")
}

export const generalRules = {
    id: joi.string().custom(customId),
    email: joi.string().email({ tlds: { allow: false } }),
    password: joi.string(),
    headers: joi.object({
        authorization: joi.string().required()
    }).unknown(),
}