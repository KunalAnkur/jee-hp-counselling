const mongoose = require("mongoose");

const collegeDataSchema = mongoose.model("college-data",
  {
    institute: { type: String },
    academic_program_name: { type: String },
    quota: { type: String },
    seat_type: { type: String },
    gender: { type: String },
    opening_rank: { type: Number },
    closing_rank: { type: Number },
  }
);

module.exports = collegeDataSchema;