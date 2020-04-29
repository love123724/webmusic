module.exports={
    plugins:{
        autoprefixer:{},
        "postcss-px-to-viewport":{
            viewportWidth: 375,
            unitPrecision: 5,
            viewportUnit: 'vw',
            selectorBlackList: ['tab-bar','tab-bar-item','ignore','header'],
            minPixelValue: 1,
            mediaQuery: false,
            exclude: [/TabBar/],

        }
    }
}