import { User } from "@/models/user";
import { connectDb, cookieSetter, generateToken } from "@/utils/features";
import { asyncError, errorHandler } from "@/middleware/error";
import bcrypt from "bcrypt";


const handler = asyncError(async (req, res) => {

    if (req.method !== "POST") {
        return errorHandler(res, 400, "only POST Method is allowed")
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return errorHandler(res, 400, "Please Enter All Fields")
    }

    await connectDb()

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return errorHandler(res, 400, "Invalid Email Id or Password")
    }

    // dcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return errorHandler(res, 400, "Invalid Email Id or Password")
    }

    const token = generateToken(user._id);

    cookieSetter(res, token, true);

    res.status(200).json({
        success: true,
        message: `Welcome back, ${user.name}`,
        user,
    });

})

export default handler;