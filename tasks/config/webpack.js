module.exports = function(grunt) {
  var webpack = require("webpack");
  grunt.config.set('webpack', {
    dev: {
      entry: "./app/templates/shop/index.js",
      resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
      },
      output: {
        filename: 'dvShop.js',
        path: '.tmp/assets/admin/js'
      },
      watch:true,
      module: {
        loaders: [
          {
            // "test" is commonly used to match the file extension
            test: /\.js$/,

            // "include" is commonly used to match the directories
            include: [
              './app/templates/'
            ],
            exclude: /(node_modules|bower_components)/,
            // "exclude" should be used to exclude exceptions
            // try to prefer "include" when possible

            // the "loader"
            loader: "babel-loader",
            query: {
              presets: ['es2015','react']
            }
          },
          {
            // "test" is commonly used to match the file extension
            test: /\.json$/,
            loader: "json-loader",
          }
        ]
      }
    },
    prod: {
      entry: "./app/templates/shop/index.js",
      resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
      },
      output: {
        filename: 'dvShop.production.js',
        path: '.tmp/assets/admin/js'
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env':{
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin()
      ],
      quiet: true,
      watch:false,
      module: {
        loaders: [
          {
            // "test" is commonly used to match the file extension
            test: /\.js$/,

            // "include" is commonly used to match the directories
            include: [
              './app/templates/'
            ],
            exclude: /(node_modules|bower_components)/,
            // "exclude" should be used to exclude exceptions
            // try to prefer "include" when possible

            // the "loader"
            loader: "babel-loader",
            query: {
              presets: ['es2015','react']
            }
          },
          {
            // "test" is commonly used to match the file extension
            test: /\.json$/,
            loader: "json-loader",
          }
        ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-webpack');
};
