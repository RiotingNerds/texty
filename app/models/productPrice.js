var mongoose = require('mongoose')

module.exports = {
  attributes: {
    affiliateID:{
      type:mongoose.Schema.Types.ObjectId,
      ref: 'affiliate'
    },
    affiliateProductID:{
      type:mongoose.Schema.Types.ObjectId,
      ref: 'affiliateProduct'
    },
    amount:Number,
    currency:String,
    date:{
      type:Date,
      default: Date.now
    }
  }
}
