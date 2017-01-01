var WP = require('wordpress-rest-api'),
  Promise = require("bluebird"),
  mongoose = require('mongoose'),
  _ = require('lodash')
module.exports = {
  index: function(req,res) {
    var self = this
    var Cache = mongoose.model('cache')
    var steps = new Promise((resolve,reject)=> {
      var config = res.app.get('appConfig'); 
      var wp = new WP({ endpoint: config.dv.api });
      Cache.getCache('steps',function(err,result) {
        if(_.isEmpty(result) || err) {
          wp.pages().id(137828).embed().get(function( err, data ) {
            if ( err ) {
              reject(err)
              // handle err 
            }
            delete data["_paging"]
            var cache = new Cache({key:'steps',value:data})
            cache.save()
            resolve(data)
          });
        } else {
          resolve(result.value)
        }
      })
    })
    steps.then(function(data) {
      var section = data.acf.sections
      res.setState({StepsReducer:{steps:section}})
      res.view()
    })
    .catch(function(err) {
      console.log(err)
    })
  }
}