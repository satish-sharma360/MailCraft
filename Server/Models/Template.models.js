import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    html: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Template", templateSchema);
