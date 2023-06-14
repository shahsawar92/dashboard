const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/dashboard",
    createProxyMiddleware("/dashboard", {
      target: "http://119.13.103.4:5000/",
      changeOrigin: true,
    })
  );
};
