var mongoose = require('mongoose')

module.exports = {
  attributes: {
    affiliateProductID:mongoose.Schema.Types.ObjectId,
    price:Number,
    currency:String,
    originalPrice:Number,
    originalCurrency:String,
    addedOn:{
      type:Date,
      default: Date.now
    }
  }
}