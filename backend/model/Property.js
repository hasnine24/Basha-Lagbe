import { Schema, model } from "mongoose";

const propertySchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    area: { type: Number, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    balconies: { type: Number, required: true },
    includes: {
      gas: { type: Boolean, default: false },
      water: { type: Boolean, default: false },
      serviceCharge: { type: Boolean, default: false },
    },
    images: [{ type: String }],
  },
  { timestamps: true }
);

const Property = model("Property", propertySchema);

export default Property;
