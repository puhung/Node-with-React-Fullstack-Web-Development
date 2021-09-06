//sub document
const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false },
});

module.exports = recipientSchema; //import this sub document in the survey.js file and associate it with the survey model
