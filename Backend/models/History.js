import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "branch",
      required: true,
    },
    status: [
      {
        name: {
          type: String,
          required: true,
          enum: ["repair", "in use", "not in use"],
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const HistoryModel = mongoose.models.History || mongoose.model("History", historySchema);

export default HistoryModel;
