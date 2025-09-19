import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String },
    email: { type: String, required: true },
    tags: [{ type: String }], // e.g. "premium", "trial"
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
