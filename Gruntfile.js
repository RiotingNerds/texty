var _ = require('lodash'),
    path = require('path')
module.exports = function(grunt) {
  tasks = require('include-all')({
    dirname     :  __dirname + '/tasks/config',
    filter      :  /(.+)\.js$/,
  });

  var tasksName = []

  grunt.initConfig({
    dirs: {
      framework: path.join(__dirname,'/app'),
      template: path.join(__dirname,'/app/templates/shop'),
      root: __dirname
    }
  })

  _.forEach(tasks, function(fn,fileName) {
    if(_.isFunction(fn)) {
      tasksName.push(fileName);
      fn(grunt);
    }
  })
  registers = require('include-all')({
    dirname     :  __dirname + '/tasks/register',
    filter      :  /(.+)\.js$/,
  });

  _.forEach(registers, function(fn,fileName) {
    if(_.isFunction(fn)) {
      tasksName.push(fileName);
      fn(grunt);
    }
  })
}