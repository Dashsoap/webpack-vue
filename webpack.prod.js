const path = require("path")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
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
            loader: 'vue-loader'
        }, {
            test: /\.(jpg|png)$/,
            loader: 'url-loader',
            options: {
                name: '[name].[ext]',
                esModule: false,
                limit: 10 * 1024
            }
        },
        {
            test: /\.css$/,
        },
        {
            test: /\.less$/,
            use: ["style-loader", 'css-loader', 'less-loader']

        }
        ],

    },
    plugins: [
        new VueLoaderPlugin
    ],

}