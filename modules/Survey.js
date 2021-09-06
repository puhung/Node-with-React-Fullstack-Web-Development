const mongoose = require("mongoose");
const { Schema } = mongoose; //pull off the schema object from mongoose
const RecipientSchema = require("./Recipient");

// _user is a reference to a particular user
const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date,
});

// Load this up to mongoose library by passing the name of the model class and the name of the schema
mongoose.model("surveys", surveySchema);
