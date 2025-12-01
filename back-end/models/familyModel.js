const mongoose = require("mongoose");

const familySchema = new mongoose.Schema(
  {
    families: {
      type: Number,
      required: true,
    },
    anbiyams: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Family", familySchema);
