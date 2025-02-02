import { asyncError, errorHandler } from "@/middleware/error";
import { cookieSetter } from "@/utils/features";


const handler = asyncError(async (req, res) => {

    if (req.method !== "GET") {
        return errorHandler(res, 400, "only GET Method is allowed")
    }

    cookieSetter(res, null, false);

    res.status(200).json({
        success: true,
        message: `Logged Out Successfully`,
    });

})

export default handler;