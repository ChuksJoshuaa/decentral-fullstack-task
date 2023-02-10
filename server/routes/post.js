import express from "express";
import { createPost, getAllPosts, getPost, updatePost, deletePost } from "../controllers/post.js";
import auth from "../middleware/auth.js";

const router = express();


//Get request
router.get("/", getAllPosts)
router.get("/:id", getPost)

//Post request
router.post('/create', auth, createPost)

//Patch request
router.patch("/update/:id", auth, updatePost);

//Delete request
router.delete("/:id", auth, deletePost);


export default router;
