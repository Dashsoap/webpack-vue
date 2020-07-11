const path = require("path")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
module.exports = {
    mode: "production",
    entry: './src/main.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [{
            test: /\.vue$/,
            use:["vue-loader","eslint-loader"]
        }, {
            test: /\.(jpg|png)$/,
            loader: 'url-loader',
            options: {
                name: '[name].[ext]',
                esModule: false,
                limit: 5 * 1024
            }
        },
        {

            test: /\.css$/,
            use:["style-loader", 'css-loader']
        },
        {
            test: /\.less$/,
            use: ["style-loader", 'css-loader', 'less-loader']

        }
        ],

    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            title:"Zjt's App"
        }),
        new webpack.DefinePlugin({
            BASE_URL:"'/'"
        })
        
    ],


}