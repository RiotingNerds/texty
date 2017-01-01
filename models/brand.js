var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = {
  attributes: {
    name: { type: String, index: true },
    slug: { type: String, index: true },
    createDate:{
      type:Date,
      default: Date.now
    }
  },
  findBySlug:(slug)=>{
    var Brand = mongoose.model('brand')
    return Brand.findOne({slug:slug})
  },
  getAllWithProducts: () => {
    var Product = mongoose.model('product')
    return Product
      .aggregate()
      .match({
        active:true,
        status:1
      })
      .group({
        _id : "$brandID",
        count: { $sum: 1 }
      })
      .match({
        count:{$gt:0}
      })
      .lookup({
        from: "brand",
        localField: "_id",
        foreignField: "_id",
        as: "brand"
      })
      .unwind("brand")
      .project({
        _id:0,
        id:"$_id",
        productCount:"$count",
        name:"$brand.name",
        slug:"$brand.slug"
      }).exec()
  }
}