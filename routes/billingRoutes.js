const keys = require("../config/keys");

// This module instruct Express that when a post request is sent in, it should takes the request body, parse it and make it available in the application

//This module helps us work with the Stripe API on server side, which helps us take the token from the front end and exchange it for an actual charge to the user's credit card.
//While in front end, the checkout.js library is the Stripe module, which shows the credit card form to the user.
const stripe = require("stripe")(keys.stripeSecretKey);

const requireLogin = require("../middlewares/requireLogin");

// This exports a function
module.exports = (app) => {
  // Only this route "/api/stripe" requires a user to be authenticated
  app.post("/api/stripe", requireLogin, async (req, res) => {
    // 1. The token from the stripe will be sent inside this request handler here.
    // 2. In here, we would take the credit card, and bill it
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id,
    });

    // When we make use of passport and user has signed into our application,
    //  we can access the current user model as req.user
    req.user.credits += 5; // Modifying the user right here doesn't actually save any changes to our database
    // Thus, we need to save update user here.
    //    Whenever we save a model, it's an asynchronous request, thus we need to use  await keyword, then it will return the updated user model
    const user = await req.user.save();

    res.send(user);
  });
};
