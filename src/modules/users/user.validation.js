import joi from "joi"
import { generalRules } from "../../utils/generalRules/index.js"
import { userRole } from "../../DB/models/user.model.js"





export const signUpSchema = {
    body: joi.object({
        name: joi.string().alphanum().required().min(3).max(15),
        email: generalRules.email.required(),
        password: generalRules.password.required(),
        cPassword: joi.string().required().valid(joi.ref("password")),
        role: joi.string().required().valid(userRole.member, userRole.admin),
    }).required(),
}

export const loginSchema = {
    body: joi.object({
        email: generalRules.email.required(),
        password: generalRules.password.required(),
    }).required(),
}