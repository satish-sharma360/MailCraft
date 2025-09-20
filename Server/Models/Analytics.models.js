import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
    recipient: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["scheduled", "sent", "failed"], 
      default: "scheduled" 
    },
    opened: { type: Boolean, default: false },
    clickedLinks: [{ type: String }], 
    error: { type: String }, 
  },
  { timestamps: true }
);

export default mongoose.model("Analytics", analyticsSchema);
