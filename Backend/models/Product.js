import mongoose from "mongoose";

const Productschema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    required: false,
    default: 0,
    min: 0,
  },
  serialNo: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  rackMountable: {
    type: Boolean,
    default: false,
  },
  isPart: {
    type: Boolean,
    default: false,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },

  model: {
    type: String,
    required: true,
  },

  dateOfPurchase: {
    type: Date,
    required: true,
  },
  warrantyMonths: {
    type: Number,
    required: true,
  },

  user: {
    type: String,
    required: true,
    enum: ["normal user", "department", "admin"],
    default: "normal user",
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },

  history: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "History",
    },
  ],
});

const ProductModel = mongoose.models.Product || mongoose.model("Product", Productschema);

export default ProductModel;
