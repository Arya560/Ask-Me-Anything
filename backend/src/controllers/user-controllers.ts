import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../libs/jwt-token-generator.js";
import { COOKIE_NAME } from "../libs/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .send("User already registered");
    }
    const hashedPassword = await hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    //create token and save cookie
    const token = createToken(
      user._id.toString(),
      user.email,
      "7d"
    );
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({
      message: "Signed up, OK",
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not registered");
    }
    const isPasswordCorrect = await compare(
      password,
      user.password
    );
    if (!isPasswordCorrect)
      return res
        .status(403)
        .json({ message: "Incorrect password" });

    const token = createToken(
      user._id.toString(),
      user.email,
      "7d"
    );
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });
    return res.status(200).json({
      message: "Logged in successfully",
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .send("User not registered or token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res
        .sendStatus(401)
        .send("Permissions didn't match");
    }
    return res.status(200).json({
      message: "OK",
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res
      .sendStatus(200)
      .json({ message: "ERROR", cause: error.message });
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .send("User not registered or token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res
        .sendStatus(401)
        .send("Permissions didn't match");
    }
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({
      message: "OK",
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res
      .sendStatus(200)
      .json({ message: "ERROR", cause: error.message });
  }
};
