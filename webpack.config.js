const path = require("path")
const htmlWebPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

module.exports = {
    entry: ["webpack-hot-middleware/client", "react-hot-loader/patch", path.join(__dirname, "index.js")],
    output: {
        filename: "app.js"
    },
    devtool: "cheap-module-eval-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules(?!(\/|\\)pixi-storybook)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["env", {"modules": false}] , "react"],
                        plugins: ["react-hot-loader/babel"],
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                    options: {
                        onlyCompileBundledFiles: true
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader", 
                    {
                        loader: "css-loader",
                        options: {
                            url: false
                        }
                    }
                    
                ]
            }
        ]
    },
    plugins: [
        new htmlWebPlugin({
            filename: "index.html",
            template: path.join(__dirname, "./template/index.html"),
            hash: true
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: [".ts", ".js"]
    },
    externals: {
        "pixi.js": "PIXI"
    }
}