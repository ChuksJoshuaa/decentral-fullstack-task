import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
      maxlength: 100,
      unique: true,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    authorId: String,
    authorName: String,
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
