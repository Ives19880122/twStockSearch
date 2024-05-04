module.exports = {
    assetsDir: 'statics',
    productionSourceMap: false,

    devServer: {
        open: true,
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://localhost:9453',
                changeOrigin: true,
            }
        },
    },

    publicPath: ''
}