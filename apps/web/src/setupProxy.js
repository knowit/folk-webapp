/**
 * Manual config of proxy that is used for `fetch` requests to the `backend` API
 * when running in development mode (not production). Automatically included by
 * create-react-app. Captures requests to non-static assets (e.g. API endpoints),
 * and redirects them to the configured proxy.
 * Read more here: https://create-react-app.dev/docs/proxying-api-requests-in-development
 */

const { createProxyMiddleware } = require('http-proxy-middleware')
const config = require('../package.json')

module.exports = function (app) {
  const proxy_url = process.env.PROXY_URL || config.proxy
  const proxy = createProxyMiddleware({
    target: proxy_url,
    changeOrigin: true,
  })
  app.use('/auth', proxy)
  app.use('/api', proxy)
}
