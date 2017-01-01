var mongoose = require('mongoose'),
  bluebird = require('bluebird')

module.exports = {
  attributes: {
    name: String,
    lastModifiedDate: {
      type:Date,
      default: Date.now
    },
    active:Boolean
  },
  getAllActive: function() {
    
    return bluebird.coroutine(function* (){
      var Affiliate = mongoose.model('affiliate')
      var query = {
        active:true
      }
      return yield Affiliate.find(query).exec()
    })()
  }
}