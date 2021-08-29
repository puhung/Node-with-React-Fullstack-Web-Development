const mongoose = require("mongoose");
const { Schema } = mongoose; //const Schema = mongoose.Schema;
// Since mongoose wants to know all of the properties that our records will have inside of our database
// it requires us to define allthose ahead of time with the schema object

const userSchema = new Schema({
  //this property would always be string
  googleId: String,
  credits: { type: Number, default: 0 },
});

//this model command allows us to create a collection called users
// loading this model into mongoose creates our model class
// 2 arguments here means we are trying to load something into it.
mongoose.model("users", userSchema);
