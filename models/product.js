var mongoose = require('mongoose'),
  productPrice = require('./productPrice'),
  bluebird = require('bluebird'),
  _ = require('lodash'),
  fx = require("money"),
  rate = require('../assets/fx.json'),
  priceRange = require('../assets/price.json')

module.exports = {
  attributes: {
    brandID: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'brand'
    },
    name: String,
    status: Number,
    c__dvCategories:{
      type:[String],
      alias:'categories'
    },
    c__imgUrls:{
      type:[String],
      alias:'imgUrls'
    },
    c__capacity:{
      type:String,
      alias:'capacity'
    },
    c__description:{
      type: String,
      alias: 'description'
    },
    data: mongoose.Schema.Types.Mixed,
    slug: { type: String},
    active:Boolean,
    cheapestPrice: productPrice.attributes,
    price: [productPrice.attributes],
    lastModifiedDate: {
      type:Date,
      default: Date.now
    },
    createDate: {
      type:Date,
      default: Date.now
    }
  },
  findBySlug: (productSlug,brand) => {

    return bluebird.coroutine(function* (){
      var brandModel;
      if(!_.isEmpty(brand)) {
        var Brand = mongoose.model('brand')
        brandModel = yield Brand.findOne({'slug':brand})
      }
      var Product = mongoose.model('product')
      var q = {
        status:1,
        active:true,
        slug:productSlug
      }
      if(!_.isEmpty(brandModel)) {
        q['brandID'] = mongoose.Types.ObjectId(brandModel.id)
      }
      var p = yield Product
        .findOne(q)
        .populate('brandID')
        .populate('cheapestPrice.affiliateID')
        .populate('price.affiliateID')
        .populate('cheapestPrice.affiliateProductID')
        .populate('price.affiliateProductID')
      var newPrice = []
      _.forEach(p.toJSON().price, function(price) {
        price.affiliate = price.affiliateID
        price.affiliateProduct = price.affiliateProductID
        newPrice.push(price)
      })
      var returnProduct = p.toJSON()
      returnProduct.price = newPrice
      returnProduct.cheapestPrice['affiliate'] = p.cheapestPrice.affiliateID
      returnProduct.cheapestPrice['affiliateProduct'] = p.cheapestPrice.affiliateProductID
      var currentRate = {}
      if(!_.isEmpty(returnProduct.cheapestPrice.exchangerates)) {
        var exchangeRates = returnProduct.cheapestPrice.exchangerates

        _.forEach(exchangeRates, function(c) {
          if(c.currency == 'SGD') {
            currentRate = c
          }
        })
      }
      returnProduct.cheapestPrice.exchangerates = currentRate
      return returnProduct
    })()
  },
  notify:(text) => {
    var api_key = 'key-9ijrk5dmziu2pp5ex6yucrxgfz0wgow1';
    var domain = 'dailyvanity.sg';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
    var html = "<u>Search Criteria</u><br />"
    _.forEach(text,function(value,key) {
      html += key+": "+value+"<br />"
    })
    var data = {
      from: 'DailyVanity Shop Search <no-reply@dailyvanity.sg>',
      to: 'Chris Sim <chris.sim@dailyvanity.sg>,Keith Toh <keith@dailyvanity.sg>',
      subject: 'Product Search return nothing',
      html: html
    };

    mailgun.messages().send(data, function (error, body) {
    });
  },
  listProducts: (params, page =0, limit=15) => {
    var self = this
    return bluebird.coroutine(function* () {
      var Product = mongoose.model('product')
      var Brand = mongoose.model('brand')
      var agg = Product.aggregate()

      var searchCriteria = {}

      var query = {
        active:true,
        status:1,
        'cheapestPrice.amount':{$gt:0}
      }
      agg.append({"$match":query})
      var results = []

      if(!_.isEmpty(params.s)) {
        var string = params.s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        agg.append({"$match":{"name":{
          "$regex": string,
          '$options':"i"
        }}})
        searchCriteria['Product Name'] = params.s
      }

      if(!_.isEmpty(params.selectedPrice)) {
        var p = {}
        _.forEach(priceRange, function(price) {
          if(price.id == params.selectedPrice) {
            p = price
          }
        })
        agg.append({"$match":{"cheapestPrice.exchangerates":{
          "$elemMatch":{"currency":"SGD","amount":{"$gte":p.min,"$lte":p.max}}
        }}})
        searchCriteria['Price selected'] = p.min + " - "+p.max
      }

      var cat = (function(params){
        var returnCat = ''
        if (!_.isEmpty(params.mainCat)) {
          returnCat += params.mainCat
          searchCriteria['Category'] = params.mainCat
        } else {
          return returnCat
        }
        if (!_.isEmpty(params.subCat)) {
          returnCat += "/" + params.subCat
        } else {
          return returnCat
        }
        if (!_.isEmpty(params.type)) {
          returnCat += "/" + params.type
        }
        return returnCat
      })(params)
      if(!_.isEmpty(cat)) {
        agg.append({"$match":{"c__dvCategories":cat}})
      }
      if(!_.isEmpty(params.brandslug)) {
        results = yield Brand.find({ slug: params.brandslug }).exec()
        var ids = []
        _.forEach(results, function(value) {
          ids.push(value._id)
        })
        if(ids.length >0)
          agg.match({"brandID":{$in:ids}})
      } else {
        if(!_.isEmpty(params.sb)) {
          searchCriteria['Brand'] = params.sb
          var string = params.sb.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
          var brandOr = []
          brandOr.push({brand:{"$regex":"^"+string,"$options":"i"}})
          results = yield Brand.find({ $text: {$search:params.sb} }).exec()
          var ids = []
          _.forEach(results, function(value) {
            ids.push(value._id)
          })
          brandOr.push({brandID:{$in:ids}})
          agg.match({"$or":brandOr})
        }
      }
      /*
      agg.append({$project:{
        _id:1,
        document:"$$ROOT",
        numberOfPrice:{$size:"$price"}
      }})
      agg.match({numberOfPrice:{$gt:0}})
*/
      var aggCount = _.clone(agg)
      var countResult = yield aggCount.group({_id:null,count:{$sum:1}}).exec()
      var returnResult = []
      var total = 0
      if(countResult[0] && countResult[0].count>0) {
        total = countResult[0].count
        var skipAmt = (page-1) * limit
        agg.lookup({from:"brand",localField:"brandID",foreignField:"_id",as:"brandID"})
        agg.unwind("brandID")
        agg.unwind("$cheapestPrice.exchangerates")
        agg.match({"cheapestPrice.exchangerates.currency":"SGD"})
        agg.sort({"cheapestPrice.exchangerates.amount":1})
        agg.skip(skipAmt)
        agg.limit(limit)
        var results = yield agg.exec()
        var affiliateArray = []
        var affiliateProdArray = []
        _.forEach(results, function(result) {
          affiliateArray.push(result.cheapestPrice.affiliateID)
          affiliateProdArray.push(result.cheapestPrice.affiliateProductID)
          _.forEach(result.price, function(p) {
            affiliateArray.push(p.affiliateID)
            affiliateProdArray.push(p.affiliateProductID)
          })
        })

        var Affiliate = mongoose.model('affiliate')
        var AffiliateProduct = mongoose.model('affiliateProduct')
        var affiliateModels = yield Affiliate.find({"_id":{$in:affiliateArray}})
        var affiliateProductModels = yield AffiliateProduct.find({"_id":{$in:affiliateProdArray}})

        var affArr = {}
        var affProdArr = {}

        _.forEach(affiliateModels, function(a) {
          affArr[a._id] = a
        })

        _.forEach(affiliateProductModels, function(a) {
          affProdArr[a._id] = a
        })

        _.forEach(results, function(result) {
          if(!_.isEmpty(affArr[result.cheapestPrice.affiliateID])) {
            result.cheapestPrice.affiliate = affArr[result.cheapestPrice.affiliateID]
          }
          if(!_.isEmpty(affProdArr[result.cheapestPrice.affiliateProductID])) {
            result.cheapestPrice.affiliateProduct = affProdArr[result.cheapestPrice.affiliateProductID]
          }
          var _price = []
          _.forEach(result.price, function(p) {
            if(!_.isEmpty(affArr[p.affiliateID])) {
              p.affiliate = affArr[p.affiliateID]
            }
            if(!_.isEmpty(affProdArr[p.affiliateProductID])) {
              p.affiliateProduct = affProdArr[p.affiliateProductID]
            }
            _price.push(p)
          })
          result.price = _price
          returnResult.push(result)
        })
      } else {
        if(!_.isEmpty(searchCriteria['Brand']) || !_.isEmpty(searchCriteria['Product Name'])) {
          Product.notify(searchCriteria)
        }
      }
      return {
        result: returnResult,
        totalCount: total
      }
    })()
  },
  plugins:[
    require('mongoose-aliasfield'),
    require('mongoose-paginate')
  ]
}
