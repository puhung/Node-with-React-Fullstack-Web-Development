// figure out what set of credentials to return

//the environment variable NODE_ENV tells us whether we are running in a production environment
if(process.env.NODE_ENV === 'production'){
    //we are in prod -return the prod set of keys
    module.exports = require('./prod');// pull the prod set of keys in and immediately pass back to whoever's asking for
}else{
    //we are in dev - return the dev keys
    module.exports = require('./dev'); // pull the dev set of keys in and immediately pass back to whoever's asking for
}