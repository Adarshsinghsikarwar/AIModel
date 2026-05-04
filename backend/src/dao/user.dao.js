import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export async function findUserByEmail(email) {
  const user = await userModel.findOne({ email });
  return user;
}

export async function createUser(userData) {
  const newUser = new userModel(userData);
  await newUser.save();
  return newUser;
}
