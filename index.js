const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session') //enable the cookie
const passport = require('passport') // tell passport to keep track of user session by using cookies
const keys = require('./config/keys');
require('./modules/User'); // this need to write in front of "require('./services/passport');""
require('./services/passport');




mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

const app = express();

app.use(
    cookieSession({
        //maxage: how long a cookie can exist, in this case , 30 days (passed in millsec)
        maxAge: 30 * 24 * 60 *60 * 1000,
        // encrypt our key
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

// app.get('/', (req, res) =>{
//     res.send({bye: 'buddy'});
// }); // This is a route handler.

//when we require the authRoute file, it returns a function (exports a function)
//Then, call that function with the app object.
require('./routes/authRoutes')(app); 

const PORT = process.env.PORT || 5000; //If environment variable has been defined by Heroku, assign it to the PORT. Or else use the local host 5000
app.listen(PORT); // instruct express to tell node to listen incoming traffic on PORT