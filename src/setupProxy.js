
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://mernserver.herokuapp.com',
      changeOrigin: true,
    })
  );
};