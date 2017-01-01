var bluebird = require('bluebird'),
  _ = require('lodash'),
  mongoose = require('mongoose'),
  Affiliate = mongoose.model('affiliate')


module.exports = {
  merge: (req,res) => {
    
  },
  create: (req,res) => {
  	res.view('post/create')
  },
  view: (req,res) => {
    var brand = req.params.brand.replace('cheapest-','')
    
    mongoose.model('product').findBySlug(req.params.product,brand).then(function(result) {
      if(!req.isAPI) {
        Affiliate.getAllActive().then(function(affiliateResult) {
          res.setState({ProductSingleReducer:{affiliate:affiliateResult,product:result || {},query:{productName:req.params.product,loadedProduct:true,brandName:req.params.brand}}})
          res.view();
        })
      }
      else {
        res.json(result)
      }
    })
  }
}