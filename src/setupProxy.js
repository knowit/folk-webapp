const config = require('../package.json')
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    const proxy = createProxyMiddleware({target: config.proxy, changeOrigin: true})
    app.use('/auth', proxy)
    app.use('/api', proxy)
}