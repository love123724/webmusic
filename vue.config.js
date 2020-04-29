module.exports={
    configureWebpack:{
        resolve:{
            alias:{
                'assets':"@/assets",
                'network':"@/network",
                'components':"@/components",
                'views':"@/views",
                'store':"@/store",
                'common':"@/common"
            }
        }
    },
    devServer:{
        open:true,
        host:'localhost',
        port:'8080',
        proxy: {
            '/api': {
                target: 'localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    }
}