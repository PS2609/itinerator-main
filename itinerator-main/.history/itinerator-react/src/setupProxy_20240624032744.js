// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://us-west4-aiplatform.googleapis.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      },
      onProxyReq: (proxyReq, req, res) => {
        // Set the authorization header if it's available
        if (process.env.REACT_APP_ACCESS_TOKEN) {
          proxyReq.setHeader('Authorization', `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`);
        }
      }
    })
  );
};