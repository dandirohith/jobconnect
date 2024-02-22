const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    minCTC: {
      type: Number,
    },
    maxCTC: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
