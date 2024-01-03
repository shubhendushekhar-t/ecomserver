import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    //add validations
    if(!name || !email || !password || !phone){
      return res.status(400).send({error:"Please provide all the required fields"})
    }
    
    //check for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new UserModel({ name, email, password:hashedPassword, phone }).save();
    // const token = user.generateAuthToken();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email ||!password) {
      return res.status(400).send({ error: "Please provide all the required fields" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "Invalid Credentials" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid Credentials" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
};