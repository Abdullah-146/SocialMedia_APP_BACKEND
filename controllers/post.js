import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  // 64a883fd6824995d6ecb67e3
  try {
    console.log(req.user.id);
    const user = await User.findById(req.user.id);
    const newPost = new Post({
      userId: req.user.id,
      firstName: user.firstname,
      lastName: user.lastname,
      desc: req.body.desc,
      location: user.location,
      userPicture: user.picturePath,
      img: req.file ? req.file.path : "",
      likes: {},
      comments: [],
    });
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.friends.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const isLiked = post.likes.get(req.user.id);

    let resp;

    if (!isLiked) {
      post.likes.set(req.user.id, true);
      resp = await post.save();

      res.status(200).json({ status: "The post has been liked", resp });
    } else {
      post.likes.delete(req.user.id);
      resp = await post.save();
      res.status(200).json({ status: "The post has been disliked", resp });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
