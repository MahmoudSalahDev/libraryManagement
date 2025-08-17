import { Router } from "express";
import * as UC from "./user.service.js";
import * as UV from "./user.validation.js";
import { validation } from "../../middleware/validation.js";
import { authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";
import { userRole } from "../../DB/models/user.model.js";




const userRouter = Router();

userRouter.post("/register",
    validation(UV.signUpSchema),
    UC.signUp);

userRouter.post("/login", validation(UV.loginSchema), UC.login);

userRouter.get("/profile", authentication, authorization(Object.values(userRole)), UC.getProfile);




export default userRouter;