import { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const signup = async (
  req: Request,
  res: Response
) => {
  console.log("user-habdler signup");
  try {
    const { name, email, password } = req.body;
    console.log("user-habdler signup");
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ message: "User already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    return res
      .status(201)
      .json({ message: "Signed up", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
