var _ = require('lodash'),
  path = require("path"),
  Router = require('routes');

module.exports = function(req,res,next) {
  
  var options = res.app.get('appOptions');  
  var config = res.app.get('appConfig');  
  
  var router = Router()
  _.map(config.statesRoute, function(state,route) {
    var routeArray = _.split(route,' ',2);
    var defaultMethod = 'all';
    var routePath = routeArray[0];
    if(_.size(routeArray)>1) {
      defaultMethod = _.toLower(routeArray[0]);
      routePath = routeArray[1];
    }
    var states = require('include-all')({
      dirname     :  path.join(options.frameworkPath, 'states'),
      filter      :  /(.+State)\.js$/,
      excludeDirs :  /^\.(git|svn)$/
    });
    var stateArray = _.split(state,'.',2);
    var defaultAction = 'index';
    if(_.size(stateArray)>1) {
      defaultAction = stateArray[1];
    }
    var stateFile = stateArray[0]+"State"
    if(!_.isEmpty(states[stateFile]) && _.isFunction(states[stateFile][defaultAction])) {
      router.addRoute(routePath,states[stateFile][defaultAction])
    }
  });

  var found = router.match(req.url)
  if(found) {
    found.fn(req,res,next)
  } else {
    next()
  }
}