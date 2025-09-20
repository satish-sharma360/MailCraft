import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    template: { type: mongoose.Schema.Types.ObjectId, ref: "Template", required: true },
    subject: { type: String, required: true },
    recipients: [{ type: String, required: true }],
    status: {
      type: String,
      enum: ["draft", "scheduled", "sending", "sent", "failed"],
      default: "draft"
    },
    sentCount: { type: Number, default: 0 },
    failedCount: { type: Number, default: 0 },
    scheduledAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Campaign", campaignSchema);
