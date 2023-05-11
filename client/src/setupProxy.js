const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(createProxyMiddleware('/upload', {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
    }), createProxyMiddleware('/api', {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
    }), createProxyMiddleware('/static/upload', {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
    }))
}