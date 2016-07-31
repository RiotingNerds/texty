var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var lastModified = Schema({
  date: {type: Date, default: Date.Now()},
  by: Schema.Types.ObjectId
});

var meta = Schema({
  name: String,
  value: String,
  private: {type: Boolean, default: false}
})

var post = Schema({
  title: { type: String, index: true },
  content: String,
  author: {type: Schema.Types.ObjectId},
  postDate: Date,
  status: String,
  meta: [meta],
  type: {type: String, default: "post"},
  createDate: {type: Date, default: Date.Now()},
  createBy: {type: Schema.Types.ObjectId},
  lastModified: [lastModified],
  lastModifiedDate: {type: Date, default:Date.Now()},
  lastModifiedBy: Schema.Types.ObjectId,
});

post.methods.addMeta = (metaObj,cb) => {
  return this.model('post').
}


module.exports = mongoose.model('options', options);