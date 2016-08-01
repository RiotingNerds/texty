require('babel-register')({ presets: [ 'react','es2015' ] })
var path = require('path');
var texty = require('./framework')
var app =texty({
  'appPath': path.join(path.dirname(__filename),'app'),
  'rootPath': path.dirname(__filename)
}).publish();