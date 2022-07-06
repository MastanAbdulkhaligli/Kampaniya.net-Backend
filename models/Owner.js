const mongoose = require("mongoose");

const OwnerSchema = new mongoose.Schema(
  {
    ownerName: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    about: { type: String, required: true },
    address: { type: String },
    addressLink: { type: String },
    telephoneNumber: { type: String },
    totalKampaniya: { type: Number },
    kampaniyaList: [String],
    image: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

module.exports = mongoose.model("Owner", OwnerSchema);
