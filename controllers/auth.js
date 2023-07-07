import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  // try catch block
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt(10); // generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // hash password

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: 0,
      impressions: 0,
    });

    const savedUser = await newUser.save(); // save user to database

    res.status(201).json(savedUser); // send response
  } catch (error) {
    res.status(500).json(error); // send error response
  }
};

/* logging in  */

const login = async (req, res) => {
  try {
    const { email, password } = req.body; // get email and password from request body

    const user = await User.findOne({ email }); // find user by email

    !user && res.status(404).json("user not found"); // if user not found send error response

    const validPassword = await bcrypt.compare(password, user.password); // compare password

    !validPassword && res.status(400).json("wrong password"); // if password is wrong send error response

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    }); // create access token

    const { password: userPassword, ...info } = user._doc; // get user info without password

    res.status(200).json({ ...info, accessToken }); // send response
  } catch (error) {
    res.status(500).json(error); // send error response
  }
};

export { register, login };
