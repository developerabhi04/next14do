import { User } from "@/models/user";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


export const connectDb = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "NextTodo",
        });
        console.log(`Database connected on ${connection.host}`);
    } catch (error) {
        console.log(`Error`);
    }
}

// cookie
export const cookieSetter = (res, token, set) => {

    // const token = "sfhjfhjh"

    res.setHeader("Set-Cookie", serialize("token", set ? token : "", {
        path: "/",
        httpOnly: true,
        maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
    }))
}

// jsonwebtoken
export const generateToken = (_id) => {

    return jwt.sign({ _id }, process.env.JWT_SECRET)
}


// middleware Auth
export const checkAuth = async (req) => {
    // console.log(req.headers.cookie.split("="));

    const cookie = req.headers.cookie;
    if (!cookie) {
        return null;
    }

    const token = cookie.split("=")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return await User.findById(decoded);
}