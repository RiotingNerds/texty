var mongoose = require('mongoose'),
  moment = require('moment')
  
module.exports = {
  attributes: {
    value: { type: Object },
    createDate:{
      type:Date,
      default: Date.now
    },
    key: {type:String, index:true}
  },
  getCache: (key, cb) => {
    var self = mongoose.model('cache')
    mongoose.model('cache').remove({createDate:{$lt:moment().subtract(6, 'hours').toDate()}}, function() {
      self.findOne({ key: key},cb);
    })
  }
}