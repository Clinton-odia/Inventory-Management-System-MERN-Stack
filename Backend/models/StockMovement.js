import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema(
    {
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        branch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
        },
        changedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ["added", "removed"],
        },
        quantity: {
            type: Number,
            required: true,
            min: 1, // the magnitude of the change, always positive — `type` carries the direction
        },
        status: {
            type: String,
            required: true,
            enum: ["repair", "in use", "not in use"], // same vocabulary as History.status
        },
        note: {
            type: String, // optional context: "damaged in transit", "restocked from Vendor X"
        },
    },
    { timestamps: true }
);

const StockMovementModel = mongoose.models.StockMovement || mongoose.model("StockMovement", stockMovementSchema);

export default StockMovementModel;