var mongoose = require('mongoose'),
  Affiliate = mongoose.model('affiliate'),
  _ = require('lodash')


module.exports = {
  index: (req,res)=> {
    Affiliate.getAllActive()
    .then(function(results) {
      res.json(results)
    })
  }
}