import { Router } from "express";
import { registerUser, loginUser, logout } from "../controllers/user.controllers.js";
import jwtVerify from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.post("/logout", jwtVerify, logout); 

export default router;
