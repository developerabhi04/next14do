import { asyncError, errorHandler } from "@/middleware/error";
import { Task } from "@/models/task";
import { checkAuth, connectDb } from "@/utils/features";




const handler = asyncError(async (req, res) => {

    if (req.method !== "POST")
        // return res.status(400).json({
        //     success: false,
        //     messsage: "Only POST Method is allowed",
        // })
        return errorHandler(res, 400, "only POST Method is allowed")

    await connectDb();


    const { title, description } = req.body;

    if (!title || !description) {
        return errorHandler(res, 400, "Please Enter All Fields")
    }

    const user = await checkAuth(req);

    if (!user) return errorHandler(res, 401, "Login First");


    await Task.create({
        title,
        description,
        user: user._id,
    })

    res.json({ success: true, message: "Task Created" });
})

export default handler;


