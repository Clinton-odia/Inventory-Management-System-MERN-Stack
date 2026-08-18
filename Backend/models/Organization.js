import mongoose from "mongoose";

const Organizationschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,

    },
    createdBy: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}
    , { timestamps: true })

const Organization = mongoose.models.Organization || mongoose.model("Organization", Organizationschema);
export default Organization