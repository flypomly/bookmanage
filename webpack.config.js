const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const merge = require("webpack-merge");
const glob = require("glob");
const files = glob.sync("./src/web/views/**/*.entry.js");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlAfterWebpackPlugin = require("./config/HtmlAfterWebpackPlugin");
const {
    join
} = require("path");

const _entry = {};
const _plugins = [];

for (let item of files) {
    if (/([a-zA-Z]+-[a-zA-Z]+)\.entry\.js$/g.test(item) == true) {
        const entryKey = RegExp.$1;
        _entry[entryKey] = item;
        const [dist, template] = entryKey.split('-');
        _plugins.push(new HtmlWebpackPlugin({
            filename: `../views/${dist}/pages/${template}.html`,
            template: `./src/web/views/${dist}/pages/${template}.html`,
            chunks: [entryKey],
            inject: false
        }));
    }
}

let webpackConfig = {
    entry: _entry,
    output: {
        path: join(__dirname, "./dist/assets"),
        filename: "scripts/[name].bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                },
                "css-loader"
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles/[name].css",
            chunkFilename: "styles/[id].css"
        }),
        ..._plugins,
        new HtmlAfterWebpackPlugin()
    ]
}

module.exports = merge(webpackConfig, _mergeConfig);