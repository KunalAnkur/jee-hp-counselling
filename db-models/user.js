const mongoose = require("mongoose");

const userSchema = mongoose.model("user", {
  email: {type:String},
  name: {type:String},
  phone: {type:String}
});

module.exports = userSchema;
