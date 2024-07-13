import { asyncError, errorHandler } from "@/middleware/error";
import { Task } from "@/models/task";
import { checkAuth, connectDb } from "@/utils/features";



const handler = asyncError(async (req, res) => {

    await connectDb();

    const user = await checkAuth(req);
    if (!user) return errorHandler(res, 401, "Your Token has Expire please login First");

    const taskId = req.query.id;
    // console.log(req.query);

    const task = await Task.findById(taskId);

    if (!task) return errorHandler(res, 404, "Task not found");



    if (req.method === "PUT") {

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Update Successfully"
        })


    } else if (req.method === "DELETE") {

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task Delete Successfully"
        })

    } else {
        errorHandler(res, 400, "This method is not Available")
    }

})

export default handler;


