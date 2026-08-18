import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
  {
    organization: {
      ref: "Organization",
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    createdBy: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    editedBy: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },

    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const BranchModel = mongoose.models.Branch || mongoose.model("Branch", branchSchema);

export default BranchModel;
