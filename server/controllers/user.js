import User from "../models/user.js";
import {
  getUserByEmail,
  hashedPassword,
  getToken,
  comparePassword,
} from "../utils/index.js";
import { userTransformer } from "../transformers/user.js";

export const signup = async (req, res) => {
  const { email, username, password, repeatPassword } =
    req.body;

  try {
    if (!username || !email || !password || !repeatPassword) {
      return res.status(404).json({ msg: "All fields are required" });
    }
    
    const oldUser = await getUserByEmail(User, email);
    const hashed = await hashedPassword(password)
    

    if (oldUser) {
        return res.status(404).json({ msg: "User already exist" });
    }

    if (password !== repeatPassword) {
        return res.status(400).json({ msg: "Password does not match" });
    }
    const result = await User.create({
        username,
        email,
        password: hashed
    });

    const token = getToken(result);

    if (!token) {
      return res.status(400).json({ msg: "Invalid token" });
    }
    res.status(200).json({ result: userTransformer(result), token });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};


export const signin = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    if (!email || !password) {
      res
        .status(404)
        .json({ status: "ok", msg: "Please provide email and password" });
    }
    const oldUser = await getUserByEmail(User, email);

    const isPasswordCorrect = await comparePassword(password, oldUser.password);

    if (!oldUser) {
      return res.status(404).json({ msg: "User does not exist" });
    }

    if (!isPasswordCorrect) {
      res.status(400).json({ msg: "Invalid Password" });
    }

    const token = getToken(oldUser);

     if (!token) {
       return res.status(400).json({ msg: "Invalid token" });
     }
    
    res.status(200).json({ result: userTransformer(oldUser), token });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

