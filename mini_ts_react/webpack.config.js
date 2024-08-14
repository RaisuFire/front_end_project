const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');


module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'mini react',
            template: 'public/index.html' })
    ],

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 4000,
    },
}
