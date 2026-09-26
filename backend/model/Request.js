import { Schema, model } from "mongoose";

const requestSchema = new Schema(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    seeker: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    advertiser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    renterName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    message: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Request = model("Request", requestSchema);

export default Request;
