const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('../package.json');

module.exports = function (app) {
  const proxy_url = process.env.PROXY_URL || config.proxy;
  const proxy = createProxyMiddleware({
    target: proxy_url,
    changeOrigin: true,
  });
  app.use('/auth', proxy);
  app.use('/api', proxy);
};
