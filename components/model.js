var mongoose = require('mongoose'),
  _ = require('lodash')

mongoose.Promise = require('bluebird');

module.exports = function(name,module) {
  var getAttributes = ()=> {
    return module.attributes
  }

  var getPlugins = () => {
    return module.plugins;
  }

  var setStatics=(statics)=> {

    var _module = Object.assign({},module)
    delete _module['attributes']
    delete _module['plugins']
    _.forEach(_module, function(fn,name) {
      if(_.isFunction(fn)) {
        statics[name] = fn
      }
    })
  }
  return {
    init:()=> {
      var model = new mongoose.Schema(getAttributes())
      setStatics(model.statics)
      _.forEach(getPlugins(), function(v) {
        model.plugin(v)
      })
      mongoose.model(name, model, name);
    }  
  }
}