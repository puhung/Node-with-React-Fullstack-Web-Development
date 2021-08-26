const passport = require('passport') //require the original npm passport module instread of passport.js

module.exports = (app) => {
    //route handler
    //use passport to authenticate the user  who is coming in on this route '/auth/google'
    // then use the strategy called 'google', which google strategy has an internal identifier of string 'google'
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
        scope: ['profile', 'email'] // ask google to give us access to user's profile info and their email addresses
        })
    );
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req,res)=>{
        req.logout(); //this logout function is attached automatically to the request object by passport
        // it takes the cookie that contains our user ID and it kills the ID that's in there
        res.send(req.user); // this only proves whoever is making this request that they are no longer signed in
    });

    //req represent incoming request and res represents outgoing response
    app.get('/api/current_user', (req, res) => {
        res.send(req.user); //passport automatically attaches this user property to the requset object
    });
};