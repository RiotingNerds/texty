module.exports = function(req,res,next) {
  req.isAPI = true
  next();
}