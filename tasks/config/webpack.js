module.exports = function(grunt) {
  var webpack = require("webpack");
  grunt.config.set('webpack', {
    framework: {
      entry: "./framework/react_components/index.js",
      resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
      },
      output: {
        filename: 'texty.js',
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
              './framework/react_components/'
            ],
            exclude: /(node_modules|bower_components)/,
            // "exclude" should be used to exclude exceptions
            // try to prefer "include" when possible

            // the "loader"
            loader: "babel-loader",
            query: {
              presets: ['es2015','react']
            }
          }
        ]
      }    
    },
    frameworkProd: {
      entry: "./framework/react_components/index.js",
      resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
      },
      output: {
        filename: 'texty.js',
        path: '.tmp/assets/admin/js'
      },
      plugins: [new webpack.optimize.UglifyJsPlugin()],
      watch:true,
      module: {
        loaders: [
          {
            // "test" is commonly used to match the file extension
            test: /\.js$/,

            // "include" is commonly used to match the directories
            include: [
              './framework/react_components/'
            ],
            exclude: /(node_modules|bower_components)/,
            // "exclude" should be used to exclude exceptions
            // try to prefer "include" when possible

            // the "loader"
            loader: "babel-loader",
            query: {
              presets: ['es2015','react']
            }
          }
        ]
      }    
    }
  });
  grunt.loadNpmTasks('grunt-webpack');
};