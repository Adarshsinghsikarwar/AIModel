import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
