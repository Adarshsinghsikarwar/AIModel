import dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables.");
}

export const config = {
  jwtSecret: process.env.JWT_SECRET,
  mongoURI: process.env.MONGO_URI,
};
