/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const { createProxyMiddleware } = require('http-proxy-middleware')
const config = require('../package.json')

// eslint-disable-next-line func-names
module.exports = function (app) {
  const proxy_url = process.env.PROXY_URL || config.proxy
  const proxy = createProxyMiddleware({
    target: proxy_url,
    changeOrigin: true,
  })
  app.use('/auth', proxy)
  app.use('/api', proxy)
}
