import express, {
    Application,
    Request,
    Response
} from "express";

import { pool } from "./db";
import { useRoute } from "./module/user/user.route";
import { profileRoutes } from "./module/profile/profie.routes";
import { authRoutes } from "./module/auth/auth.routes";
const app: Application = express();

// middleware
app.use(express.json());
app.use(express.text());

app.use("/api/v1/users", useRoute);
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/profiles", profileRoutes);

// get method
app.get("/", (req: Request, res: Response) => {
    // console.log(req)
    res.status(200).json({
        success: true,
        message: "This is root router",
        auther: "PH"
    })
})

export default app; 