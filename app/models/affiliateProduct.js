var mongoose = require('mongoose'),
  _ = require('lodash')

module.exports = {
  attributes: {
    brandID: mongoose.Schema.Types.ObjectId,
    name: String,
    status: Number,
    category:{
      type:[String],
      alias:'c__dvCategories'
    },
    affiliateID:{
      type:mongoose.Schema.Types.ObjectId
    },
    accountID:{
      type:mongoose.Schema.Types.ObjectId
    },
    sku:{
      type:String,
      alias:'c__sku'
    },
    affiliateURL:{
      type:String
    },
    realURL:{
      type:String
    },
    imgUrls:{
      type:[String],
      alias:'c__imgUrls'
    },
    capacity:{
      type:String
    },
    description:{
      type: String,
      alias: 'c__description'
    },
    active:Boolean,
    price: {
      price:Number,
      currency:String,
      originalPrice:Number,
      originalCurrency:String,
      addedOn:{
        type:Date,
        default: Date.now
      }
    },
    lastModifiedDate: {
      type:Date,
      default: Date.now
    },
    createDate: {
      type:Date,
      default: Date.now
    }
  },
  byProductPrice:(price)=>{
    var search = []
    _.forEach(price, function(p) {
      search.push(p.affiliateProductID)
    })
    return this.find({_id:{$in:search}})
  }
}