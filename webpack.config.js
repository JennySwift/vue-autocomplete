var webpack = require('webpack'),
    path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //where our application source code lives
    // context: __dirname + "/app",
    //the first file that webpack should load (the same way way configure package.json with a main file)
    entry: {
        app: './index.js'
    },
    //where our bundle will go when webpack is done
    output: {
        path: __dirname + "/build/js",
        filename: "bundle.js",
        //For source maps after I started using vue-loader
        devtoolModuleFilenameTemplate: function (info) {
            if (info.resource.match(/\.vue$/)) {
                $filename = info.allLoaders.match(/type=script/)
                    ? info.resourcePath : 'generated';
            }
            else {
                $filename = info.resourcePath;
            }
            return $filename;
        }
    },
    plugins: [
        new webpack.IgnorePlugin(/jsdom$/),
        new HtmlWebpackPlugin()
        // new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    ],
    devtool: 'eval-source-map',


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
            },
            //For my partials
            {
                test: /\.html$/,
                loader: "vue-html"
            }
        ]
    },
    babel: {
        presets: ['es2015']
    }
};