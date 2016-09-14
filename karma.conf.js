// Karma configuration
// Generated on Sun Aug 28 2016 19:50:11 GMT+1000 (AEST)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],


        // list of files / patterns to load in the browser
        files: [
            'index.js',
            // 'resources/assets/js/plugins/**/*.js',
            // 'resources/assets/js/shared/**/*.js',
            // 'resources/assets/js/repositories/**/*.js',
            // 'resources/assets/js/components/**/*.js',
            // 'resources/assets/js/directives/**/*.js',
            // 'resources/assets/js/tests/spec/**/*Spec.js'


            // 'resources/assets/js/**/*.js',
            'test/**/*.js'
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'index.js': ['webpack'],
            'test/**/*.js': ['webpack']
        },

        plugins: [
            require("karma-webpack"),
            'karma-mocha',
            'karma-chrome-launcher',
            require('karma-mocha-reporter'),
            // 'karma-osx-reporter',
            // require('karma-notify-reporter')
        ],

        //karma-mocha-reporter
        mochaReporter: {
            output: 'full',
            showDiff: true
        },

        //karma-notify-reporter
        notifyReporter: {
            reportEachFailure: true,
            reportSuccess: true
        },

        osxReporter: {
            notificationMode: 'always'
        },

        webpack: {
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
            devtool: "cheap-module-source-map" // faster than 'source-map'
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: 'errors-only',
            noInfo: true
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        //notify and osx are supposed to notify but they didn't work
        reporters: [
            'dots',
            'mocha',
            // 'notify',
            // 'osx'
        ],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
};