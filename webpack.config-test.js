// var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');

module.exports = {
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    // externals: [nodeExternals()], // in order to ignore all modules in node_modules folder

    //For vue-loader
    module: {
        // `loaders` is an array of loaders to use.
        // here we are only configuring vue-loader
        loaders: [
            {
                test: /\.vue$/, // a regex for matching all files that end in `.vue`
                loader: 'vue'   // loader to use for matched files
            },
            {
                // use babel-loader for *.js files
                test: /\.js$/,
                loader: 'babel',
                // important: exclude files in node_modules
                // otherwise it's going to be really slow!
                exclude: /node_modules/
            }
        ]
    },
    babel: {
        presets: ['es2015']
    },
    devtool: "cheap-module-source-map", // faster than 'source-map',
    plugins: [
        new webpack.IgnorePlugin(/jsdom$/)
    ]

};