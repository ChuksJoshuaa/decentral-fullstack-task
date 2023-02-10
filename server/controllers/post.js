import Post from "../models/post.js";
import User from "../models/user.js";
import mongoose from "mongoose";
import { getUserByEmail } from "../utils/index.js";


// create post
export const createPost = async (req, res) => {
  const { title, description, imageUrl } = req.body

  try {
        const creator = await getUserByEmail(User, req.user.email);
        if (title === "" || description === "" || imageUrl === "") {
        return res.status(404).json({ msg: "All fields are required" });
        } else {
        const newPost = new Post({
            ...req.body,
            authorId: req.user.userId,
            authorName: creator.username, 
            createdAt: new Date().toISOString(),
        });
        await newPost.save();
        res.status(201).json({ newPost });
        }
    } catch (error) {
        res.status(409).json({ msg: error.msg });
    }
};

//get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ _id: -1 })
    res.status(200).json({ posts, count: posts.length });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};


//get single post
export const getPost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No post with id: ${_id}`);
  }

  try {
    const post = await Post.findById(_id);
    res.status(200).json({ post });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};


//Update post
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    
    const { title, description, imageUrl } = req.body

    if (title === "" || description === "" || imageUrl === "") {
      return res.status(404).json({ msg: "All fields are required" });
    }
    
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
          return res.status(404).send(`No post with id: ${_id}`);
        } else {
          const updatedPost = await Post.findByIdAndUpdate(
            _id,
            { title, description, imageUrl },
            {
              new: true,
              runValidators: true,
            }
          );
          res.status(200).json(updatedPost);
        }
    }
    catch (error) {
       res.status(404).json({ msg: error.msg });
    }
};

//Delete posts
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No post with id: ${_id}`);
  } else {
    await Post.findByIdAndDelete(_id);
  }
  res.status(200).send("Post was deleted Successfully");
};