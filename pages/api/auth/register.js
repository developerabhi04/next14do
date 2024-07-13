import { User } from "@/models/user";
import { connectDb, cookieSetter, generateToken } from "@/utils/features";
import { asyncError, errorHandler } from "@/middleware/error";
import bcrypt from "bcrypt";


const handler = asyncError(async (req, res) => {

    if (req.method !== "POST") {
        return errorHandler(res, 400, "only POST Method is allowed")
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return errorHandler(res, 400, "Please Enter All Fields")
    }

    await connectDb()

    let user = await User.findOne({ email });

    if (user) {
        return errorHandler(res, 400, "User Already Registered with this email id!")
    }

    // bcrypt
    const hashedPassword = await bcrypt.hash(password, 10)

    user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = generateToken(user._id);

    cookieSetter(res, token, true);

    res.status(201).json({
        success: true,
        message: "Registered Successfully",
        user,
    });

})

export default handler;