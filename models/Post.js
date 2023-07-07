import express from "express";
import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    location: String,
    img: {
      type: String,
    },
    userPicture: {
      type: String,
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
