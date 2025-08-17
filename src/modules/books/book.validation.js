import joi from "joi"





export const addBookSchema = {
    body: joi.object({
        title: joi.string().alphanum().required().min(2).max(100),
        author: joi.string().alphanum().required().min(2).max(100),
        publishedYear: joi.number().required().min(0),
        availableCopies: joi.number().required().min(0),
    }).required(),
}


export const updateBookSchema = {
    body: joi.object({
        title: joi.string().alphanum().min(2).max(100),
        author: joi.string().alphanum().min(2).max(100),
        publishedYear: joi.number().min(0),
        availableCopies: joi.number().min(0),
    }).min(1),
}
