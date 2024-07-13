import { asyncError, errorHandler } from "@/middleware/error";
import { Task } from "@/models/task";
import { checkAuth, connectDb } from "@/utils/features";




const handler = asyncError(async (req, res) => {

    if (req.method !== "GET") {
        return errorHandler(res, 400, "Only GET Method is allowed");
    }

    await connectDb();

    const user = await checkAuth(req);

    if (!user) return errorHandler(res, 401, "Your Token has Expire please login First")

    const tasks = await Task.find({ user: user._id })

    res.json({
        success: true,
        tasks,
    });
})

export default handler;


