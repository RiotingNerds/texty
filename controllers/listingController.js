var mongoose = require('mongoose'),
  Product = mongoose.model('product'),
  Brand = mongoose.model('brand'),
  Affiliate = mongoose.model('affiliate')


module.exports = {
  index: function(req,res) {

    var params = {
      page:0
    }
    if(req.params.mainCat || req.query.mainCat)
      params.mainCat = req.params.mainCat || req.query.mainCat
    if(req.params.subCat  || req.query.subCat)
      params.subCat = req.params.subCat || req.query.subCat
    if(req.params.type || req.query.type)
      params.type = req.params.type || req.query.type

    if(req.query.selectedBrands) {
      params.brandIDs = req.query.selectedBrands.split(',')
      params.selectedBrands = req.query.selectedBrands
    }

    if(req.query.page)
      params.page = req.query.page
    else 
      params.page = 1

    params.s = ""
    params.sb = ""
    params.onlyBrand = ""
    if(req.query.s)
      params.s = req.query.s
    if(req.query.sb)
      params.sb = req.query.sb

    if(req.params.brand) {
      params.brandslug = req.params.brand.replace("cheapest-","")
      params.onlyBrand = req.params.brand
    }

    if(req.query.brand) {
      params.brandslug = req.query.brand.replace("cheapest-","")
      params.onlyBrand = req.query.brand
    }

    if(req.query.selectedPrice)
      params.selectedPrice = req.query.selectedPrice
    Product.listProducts(params,params.page).then(function(results) {
      if(!req.isAPI) {
        Affiliate.getAllActive().then(function(affiliateResult) {
          res.setState({ListingPageReducer:{affiliate:affiliateResult,products:results.result,query:params,totalCount: results.totalCount}})
          res.view()
        })
        
      }
      else {
        res.json(results)
      }
    })
  }
}
