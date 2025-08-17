import { nanoid } from "nanoid";
import userModel, { userRole } from "../../DB/models/user.model.js";
import { Compare } from "../../utils/hash/compare.js";
import { Hash } from "../../utils/hash/hash.js";
import { generateToken } from "../../utils/token/generateToken.js";




export const signUp = async (req, res, next) => {
    const { name, email, password, role } = req.body;



    if (await userModel.findOne({ email })) {
        throw new Error("email already exist!!", { cause: 409 });
    }

    // Hash password
    const hash = await Hash({ plainText: password, SALT_ROUNDS: +process.env.SALT_ROUNDS }); 



    const user = await userModel.create({
        name,
        email,
        password: hash,
        role,
    });



    return res.status(201).json({ message: "user created successfully", user});
};




export const login = async (req, res, next) => {
    

    const { email, password } = req.body

    const user = await userModel.findOne({ email: email })
    if (!user) {
        throw new Error("email not exist!", { cause: 404 })
    }
    const match = await Compare({ plainText: password, cipherText: user.password })
    if (!match) {
        throw new Error("invalid email or password!", { cause: 400 })
    }

    // create token 
    const access_token = await generateToken({
        payload: { id: user._id, email },
        SIGNATURE: user.role == userRole.user ? process.env.ACCESS_TOKEN_USER : process.env.ACCESS_TOKEN_ADMIN,
        options: { expiresIn: "1h", jwtid: nanoid() }
    })
    const refresh_token = await generateToken({
        payload: { id: user._id, email },
        SIGNATURE: user.role == userRole.user ? process.env.REFRESH_TOKEN_USER : process.env.REFRESH_TOKEN_ADMIN,
        options: { expiresIn: "1y", jwtid: nanoid() }
    })

    return res.status(200).json({ message: "success", access_token, refresh_token })

}

export const getProfile = async (req, res, next) => {
    
    //  ...user, phone
    return res.status(200).json({ message: "success", user: req.user })

}