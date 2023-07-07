import User from "../models/User.js";

/* Read */

export const getUser = async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.user.id);
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("friends");
    const friends = user.friends;
    res.status(200).json(friends);
  } catch (error) {
    res.status(404).json(error);
  }
};

/* Update */

export const addRemoveFriend = async (req, res) => {
  const { id, friendId } = req.params;

  try {
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user.friends.includes(friendId)) {
      await user.updateOne({ $push: { friends: friendId } });
      await friend.updateOne({ $push: { friends: id } });
      res.status(200).json("user has been added to your friends");
    } else {
      await user.updateOne({ $pull: { friends: friendId } });
      await friend.updateOne({ $pull: { friends: id } });
      res.status(200).json("user has been removed from your friends");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
