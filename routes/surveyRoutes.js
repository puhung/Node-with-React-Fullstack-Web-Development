const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");

// This SUrvey is a mongoose model class
const Survey = mongoose.model("surveys");

module.exports = (app) => {
  // The argument will be executed in order, then eventually takes the response object and send the respond object back to user
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    // First, Make sure user is logged in
    //  Next, Make sure user has enough credits

    // All the different properties gets passed along inside the request exist on the body property of the object
    const { title, subject, body, recipients } = req.body;

    // Use the mongoose class to create an instance of surveys
    // split(',') function creates an array of email address
    // map() return an object with email property that points out the user's email
    //trim() curts out any extra white space
    // id is a property of any mongoose model
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });
  });
};
