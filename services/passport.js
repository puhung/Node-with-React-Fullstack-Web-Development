const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const mongoose = require('mongoose');
//for everthing that uses mongoose model class we would not use request statement
const User = mongoose.model('users'); // we can pull a schema or pull a model out of mongoose
//by just giving a 'single' statement
// This User object here is our model class, which allows us to use it create a model instance and persist it into the MongoDB database


//we take the user model and put some identifying piece of information into the cookie
//the 'user' is what we pull out from the database
passport.serializeUser((user, done) => {

  done(null, user.id); 
  // user.id is the id assigned to the record by mongo automatically, which is different from the google profile ID 
  // we turn the user mongoose model into the user.id 
});

  // turn the id into a mongoose model instance , which means we turn the user id into a user.
passport.deserializeUser((id, done) => {

  // any time we access the mongo database, it is always an asynchronous func
  //it would return a promise that would be resolved after a user with given ID is found
  User.findById(id).then(user => {
      done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    }, 
    (accessToken, refreshToken, profile, done) => {
      // User.findOne() is a query and it is an asynchronous operation
      User.findOne({ googleId: profile.id}) //this query returns a promise, which is a tool that we use for JS for handling asynchronous code
        .then((existingUser) => {
          if (existingUser){
            //if this existingUser exists , we have a record with profile ID
            done(null, existingUser); // provide 2 arguments to this function
            //the first is the error object: in this case it is a null
            //the second would be the user record, which is the existing user 
          }else{
            //we don't have this user record, make a new record
            new User({googleId: profile.id})
              .save()
              .then(user => done(null, user)); 
            //this save function helps us save the model instance from the JS world to MongoDB world 
            //it is also an asynchronous operation
            // To get a notification that the user has been successfully saved, we need to chain the dot then statment

          }
        })
      
    }
  )
);
//this second argument of google strategy was a callback function 
//that was automatically called any time the user was redirected back to the application from the google flow