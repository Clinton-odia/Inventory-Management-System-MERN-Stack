import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    editedBy: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
  },

  {
    timestamps: true,
  }
);

const VendorModel = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);

export default VendorModel;
