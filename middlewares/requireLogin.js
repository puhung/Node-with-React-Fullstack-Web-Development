// "next" function here is called when our middleware is complete
// "next" indicates when you call this function, it's going to pass the request off to the next middleware in the chain
module.exports = (req, res, next) => {
  //check and make sure the user is signed in
  // No user, return error
  if (!req.user) {
    return res.status(401).send({ error: "You must log in!" });
  }
  // Otherwise, let this user continue on to the actual request handler
  next();
};
