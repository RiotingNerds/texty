var mongoose = require('mongoose');
module.exports = {
  dbConnection:'',
  init:(config,cb)=>{
    mongoose.connect(config.database[config.connection.database].uri);
    var db = mongoose.connection;
    var self = this
    db.on('error', function(err) {
      console.log(err)
      cb(err)
    })
    db.once('open', function() {
      cb(null)
    });
  }
}