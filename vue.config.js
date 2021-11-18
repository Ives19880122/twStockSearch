module.exports = {
    assetsDir: 'statics',
    productionSourceMap: false,
    devServer:{
        open:true,
        port:8080,
        proxy: {
            '/stock/realtime': {
              target:'http://localhost:9453',
              changeOrigin:true,
            }
        },
    }
}