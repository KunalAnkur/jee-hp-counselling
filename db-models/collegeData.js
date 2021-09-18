const mongoose = require("mongoose");

const counsellingOne = mongoose.model("college-one-data", {
  institute: { type: String },
  academic_program_name: { type: String },
  quota: { type: String },
  seat_type: { type: String },
  gender: { type: String },
  opening_rank: { type: Number },
  closing_rank: { type: Number },
});

// const counsellingTwo = mongoose.model("college-two-data", {
//   institute: { type: String },
//   academic_program_name: { type: String },
//   quota: { type: String },
//   seat_type: { type: String },
//   gender: { type: String },
//   opening_rank: { type: Number },
//   closing_rank: { type: Number },
// });

// const counsellingThree = mongoose.model("counsel-three-data", {
//   institute: { type: String },
//   academic_program_name: { type: String },
//   quota: { type: String },
//   seat_type: { type: String },
//   gender: { type: String },
//   opening_rank: { type: Number },
//   closing_rank: { type: Number },
// });

// const counsellingFour = mongoose.model("counsel-four-data", {
//   institute: { type: String },
//   academic_program_name: { type: String },
//   quota: { type: String },
//   seat_type: { type: String },
//   gender: { type: String },
//   opening_rank: { type: Number },
//   closing_rank: { type: Number },
// });

// const counsellingFive = mongoose.model("counsel-five-data", {
//   institute: { type: String },
//   academic_program_name: { type: String },
//   quota: { type: String },
//   seat_type: { type: String },
//   gender: { type: String },
//   opening_rank: { type: Number },
//   closing_rank: { type: Number },
// });

const counsellingSix = mongoose.model("couselling-six-second-tests", {
  institute: { type: String },
  academic_program_name: { type: String },
  quota: { type: String },
  seat_type: { type: String },
  gender: { type: String },
  opening_rank: { type: Number },
  closing_rank: { type: Number },
});

module.exports = {
  counsellingOne,
  // counsellingTwo,
  // counsellingThree,
  // counsellingFour,
  // counsellingFive,
  counsellingSix
};
