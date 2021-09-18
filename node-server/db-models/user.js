const mongoose = require("mongoose");

const userSchema = mongoose.model("user", {
  email: { type: String },
  name: { type: String },
  phone: { type: String },
  searchCombinations: [
    {
      institute: { type: String },
      academic_program_name: { type: String },
      quota: { type: String },
      seat_type: { type: String },
      gender: { type: String },
      rank: { type: Number },
    },
  ],
});

module.exports = userSchema;
