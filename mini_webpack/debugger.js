const webpack = require('./webpack')
const webpackConfig = require('./webpack.config')

const compiler = webpack(webpackConfig)

compiler.run((err, stats) => {
    console.log(err)
    console.log(
        stats.toJson({
            assets: true,
            chunks: true,
            modules: true,
        })
    )
})

