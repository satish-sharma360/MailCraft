import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true ,trim: true},
    lastName: { type: String, required: true ,trim: true},
    avatar: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    plan: { type: String, default: "free" }, // free, pro, etc. (future use)
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
