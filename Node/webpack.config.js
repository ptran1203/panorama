var glob = require("glob");
var path = require("path");
const jsFilePaths = "./src/pages/*.jsx";
const CleanWebpackPlugin = require('clean-webpack-plugin');

console.log(__dirname)
var rootDir = '.';
const jsEntry = `${rootDir}/Scripts/[name].js`;
const cssEntry = `${rootDir}/Contents/css/[name].css`;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
var filePaths = glob.sync(jsFilePaths) //get tất cả file có đuôi jsx trong folder page
var entries = {};
//tạo entries ex: {HomePage:'./page/HomePage.js'}
filePaths.map((filePath, index) => {
    var fileName = path.basename(filePath, ".jsx");
    entries[fileName] = filePath;
});
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
    devtool: 'source-map', // none: chay production ra minified; source-map: chay dev ra original code de debug
    entry: entries,
    // entry: ['webpack-hot-middleware/client.js?quiet=true'],
    output: {
        pathinfo: false,
        filename: jsEntry, //[name] tên y chang tên của page, 1 trang là 1 bundle
    },
    resolve: {
        modules: [
            path.resolve('./node_modules'),
            path.resolve('./src')
        ],
        extensions: ["*", ".jsx", ".js"]
    },
    stats: "none",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader",
                    "sass-loader",
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: false,
                            keepQuery: true
                        }
                    },
                ]
            },
            //font awesome cần cái này để load font của nó
            {
                test: /\.(png|jpg|gif|jpeg|eot|ttf|woff)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            sourceMap: false
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: cssEntry
        }),
        new CleanWebpackPlugin(['Contents', 'Scripts'], { root: __dirname + '/dist/', verbose: true }),
        new WebpackShellPlugin({
            onBuildExit: 'node afterBuild.js'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jquery",
            "window.jQuery": "jquery",
            jQuery: "jquery"
        })
    ],
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
};