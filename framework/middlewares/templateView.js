var path = require("path"),
	_ = require('lodash');

module.exports = (req,res,next)=>{

	//TODO: Make this variable dynamic according to admin route config
	var adminViewRoute = 'admin';

  var options = res.app.get('appOptions');  
  var pathArray = _.split(req.path, '/')
  var viewPath = path.join(options.appPath,'views');
  if(pathArray.length>0) {
  	if(pathArray[1]==adminViewRoute) {
  		viewPath = path.join(options.frameworkPath,'views');
  	}
  }
  res.app.set('views',viewPath);
  next()
}