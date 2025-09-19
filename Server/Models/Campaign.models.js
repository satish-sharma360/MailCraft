import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    template: { type: mongoose.Schema.Types.ObjectId, ref: "Template", required: true },
    subject: { type: String, required: true },
    recipients: [{ type: String, required: true }], // list of emails
    status: { 
      type: String, 
      enum: ["scheduled", "sent", "draft"], 
      default: "draft" 
    },
    scheduledAt: { type: Date }, // for scheduling
  },
  { timestamps: true }
);

export default mongoose.model("Campaign", campaignSchema);
