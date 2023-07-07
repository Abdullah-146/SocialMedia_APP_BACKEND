import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      trim: true,
    },
    picturePath: {
      type: String,
      default:
        "https://res.cloudinary.com/djxhcwowp/image/upload/v1623680973/blank-profile-picture-973460_1280_uxqj0n.png",
    },
    friends: {
      type: Array,
      ref: "User",
      default: [],
    },
    location: {
      type: String,
    },
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
