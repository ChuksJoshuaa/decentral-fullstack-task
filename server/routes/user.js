import express from "express";
import { signup, signin } from "../controllers/user.js";

const router = express();

router.post("/login", signin);
router.post("/register", signup);

export default router;
