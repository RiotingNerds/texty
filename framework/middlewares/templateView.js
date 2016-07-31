var path = require("path")

module.exports = function(req,res,next) {
  var options = res.app.get('appOptions');
  res.app.set('views',path.join(options.appPath,'views'))
  console.log(res.app.get('views'))
  next()
}