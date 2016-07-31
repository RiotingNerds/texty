var path = require("path")

module.exports = function(req,res,next) {
  res.view = (view,params)=>{
  	res.render(view, params, function(err,html) {
  		res.render('layout/main',{body: html})
  	})
  }
  next()
}