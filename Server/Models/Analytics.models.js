import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
    recipient: { type: String, required: true },
    opened: { type: Boolean, default: false },
    clickedLinks: [{ type: String }], // track which links clicked
  },
  { timestamps: true }
);

export default mongoose.model("Analytics", analyticsSchema);
