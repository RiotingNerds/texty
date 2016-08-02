var expressConfig = require('./components/express'),
    path = require('path');


module.exports = function(options) {
  return {
    publish: function() {
      options.frameworkPath = path.dirname(__filename); 
      var app = expressConfig(options).init();
      app.listen(1337, function () {
        console.log('Example app listening on port 1337!');
      });
    }
  }
}