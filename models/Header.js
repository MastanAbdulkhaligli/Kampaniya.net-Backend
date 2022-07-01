const mongoose = require("mongoose");

const HeaderSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    color: { type: String, required: true },
    isActive: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

module.exports = mongoose.model("Header", HeaderSchema);
