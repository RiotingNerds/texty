var WP = require('wordpress-rest-api'),
  Promise = require("bluebird"),
  mongoose = require('mongoose'),
  _ = require('lodash')

module.exports = function(req,res,next) {
  var config = res.app.get('appConfig'); 

  var wp = new WP({ endpoint: config.dv.api });
  var self = this
  var Cache = mongoose.model('cache')
  var beautyTips = new Promise((resolve,reject)=> {
    Cache.getCache('beautyTips',function(err,result) {
      if(_.isEmpty(result) || err) {
        wp.posts().perPage(3).category(2).embed().get(function( err, data ) {
          if ( err ) {
            reject(err)
            // handle err 
          }
          delete data["_paging"]
          var cache = new Cache({key:'beautyTips',value:data})
          cache.save()
          resolve(data)
        });
      } else {
        resolve(result.value)
      }
    })
  })

  var review = new Promise((resolve,reject)=> {
    Cache.getCache('reviews',function(err,result) {
      if(_.isEmpty(result) || err) {
        wp.posts().perPage(3).category(1).embed().get(function( err, data ) {
          if ( err ) {
            reject(err)
            // handle err 
          }
          delete data["_paging"]
          var cache = new Cache({key:'reviews',value:data})
          cache.save()
          resolve(data)
        });
      } else {
        resolve(result.value)
      }
    })
  })
  
  Promise.all([beautyTips,review]).then(function(responses) {
    res.setState({TopNavReducer:{beautyTips:responses[0],review:responses[1]}})
    next()
  })
}