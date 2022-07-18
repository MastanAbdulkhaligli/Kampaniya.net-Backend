const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    kampaniyaName: { type: String, required: true, unique: true },
    owner: { type: String, required: true },
    aboutProduct: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: Object, required: true },
    addressLink: { type: Object },
    phoneNumber: { type: String },
    productStatus: { type: String },
    hashTag: [String],
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

module.exports = mongoose.model("Product", ProductSchema);
