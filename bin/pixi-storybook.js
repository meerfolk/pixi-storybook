#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const express = require("express")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const argv = require("yargs").argv

let config
let configDir

if (argv.config && fs.existsSync(argv.config)) {
    const configPath = path.join(process.cwd(), argv.config)
    configDir = path.dirname(configPath)
    config = require(path.join(process.cwd(), argv.config))
} else {
    console.log("ERROR: config file not set")
    return
}

const app = express()
const webpackConfig = require(path.join(__dirname, "../webpack.config.js"))

if (config.static) {
    app.use(express.static(path.join(configDir, config.static), {index: false}))
}

if (config.before || config.styles) {
    let options = {}
    if (config.before) {
        options.before = path.join(configDir, config.before);
    }
    if (config.styles) {
        options.styles = config.styles.map(item => path.join(configDir, item)) 
    }
    webpackConfig.module.rules.unshift({
        test: path.resolve(__dirname, "../index.js"),
        use: {
            loader: path.resolve(__dirname, "../loaders/indexLoader"),
            options
        }
    })
}

if (config.declare) {
    webpackConfig.module.rules.unshift({
        test: path.resolve(__dirname, "../src/App"),
        use: {
            loader: path.resolve(__dirname, "../loaders/importLoader"),
            options: {
                imports: config.declare.map(item => path.join(configDir, item))
            }
        }
    })
}

const compiller = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiller, {
    publickPath: path.join(__dirname, "/")
}))

app.use(webpackHotMiddleware(compiller))

app.listen(9001, function() {
    console.log('Example app listening on port 9001!\n')
})