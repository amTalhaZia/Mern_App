import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

const jwtVerify = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        req.user = user; 
        next(); 
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Token is not valid",
        });
    }
});

export default jwtVerify;
