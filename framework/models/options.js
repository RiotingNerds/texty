var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var options = Schema({
  name: { type: String, index: true },
  value: String,
  lastModifiedDate: {type: Date, default:Date.Now()}
});

module.exports = mongoose.model('options', options);