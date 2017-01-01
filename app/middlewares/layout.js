var path = require("path")

module.exports = function(req,res,next) {
  var config = res.app.get('appConfig'); 
  res.view = (view,params)=>{
  	res.render(view, params, function(err,html) {
  		res.render(config.view.layout,{body: html})
  	})
  }
  next()
}