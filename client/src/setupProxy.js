const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
//the proxy here is to rewrite requests from localhost 3000 to localhost 5000
//We have to do this because in the development world, we are running 2 servers, which is the creat-react server and the nodeJS server on the back-end.
//so any api request from the browser has to be proxy over to the Express api.

//But when we deploy our application, which means in production, we no longer make use of create-react-app
//Create-react-app exists only sole purpose is to give us a good development experience.

//In production, the Node Express Api will serve all those public assets like JS, CSS , HTML files.
