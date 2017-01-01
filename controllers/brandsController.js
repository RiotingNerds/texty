var mongoose = require('mongoose'),
  Brand = mongoose.model('brand'),
  Product = mongoose.model('product'),
  _ = require('lodash')


module.exports = {
  index: (req,res)=> {
    Brand.getAllWithProducts()
    .then(function(results) {
      res.json(results)
    })
  },
  listByBrand: function(req,res) {
    var brand = req.params.brand.replace('cheapest-','')
    Brand.findBySlug(brand).then(function(result) {
      var params = {
        brandIDs:[result._id]
      }
      var ID = result._id
      Product.listProducts(params).then(function(results) {
        Brand
          .find({})
          .then(function(brands) {
            var newBrands = []
            var selectedBrands = []
            _.forEach(brands,function(b) {
              if(b._id.toString() == ID) {
                b.selected = true
              } else {
                b.selected = false
              }
              newBrands.push(b)
              if(b.selected) {
                selectedBrands.push(b._id)
              }
            })
            if(!req.isAPI) {
              res.setState({ListingPageReducer:{products:{items:results.result,query:{}},selectedBrands:selectedBrands.join(','),brands:newBrands,totalCount: results.totalCount}})
              res.view();
            }
            else {
              res.json(results)
            }
          })
      })
    })
    
  }
}