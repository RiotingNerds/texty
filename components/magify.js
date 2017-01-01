var path = require('path'),
    loader =require('include-all'),
    _ = require('lodash'),
    express = require('express'),
    db = require('./components/db'),
    favicon = require('serve-favicon'),
    mongoose = require('mongoose'),
    model = require('./components/model'),
    child_process = require("child_process"),
    app = express();


import { RouterContext, match } from 'react-router'
import { renderToString } from 'react-dom/server'
import Helmet from "react-helmet";
import React from 'react'
import thunk from 'redux-thunk';
import { Map } from 'immutable';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import texty from './templates/shop/reducers'
import {Routes} from './templates/shop/app/router'

module.exports = function(options) {
  return {
    config: {
      http:{
        port:1337,
        staticPath:'www'
      },
    },
    process:[],
    options:{},
    init: function() {
      var self = this
      options.frameworkPath=path.dirname(__filename)
      loader.aggregate({
        dirname: options.configPath,
        filter: /(.+)\.js$/,
        excludeDirs :  /^\.(git|svn)$/,
        depth: 1
      },(err,modules)=>{
        self.config = _.assign(self.config,modules,options.config)
        self.options = options
        self.setup();
        db.init(self.config,function() {
          app.listen(self.config.http.port, function () {
            console.log('Application Started at: ' +self.config.http.port);
            var gruntProcess = 'dev';
            var output = true;
            if(!_.isEmpty(process.env.APP_ENV) && process.env.APP_ENV == "prod") {
              gruntProcess = "prod"
              //output = false
            }
            self.grunt(gruntProcess, output).on("exit", function() {
              console.log('Grunt Process done.');
            })
          });
        })


      });
    },
    grunt:function(task,output) {
      var options = {
        silent: !output,
        cwd: this.options.rootPath
      };
      var child = child_process.fork(this.options.rootPath+'/node_modules/grunt-cli/bin/grunt',[task], options);
      this.process.push(child)
      return child
    },
    setup: function() {
      app.set('appOptions',this.options)
      app.set('appConfig',this.config)
      process.on('exit', this.killChild);
      this.model();
      this.middleware();
      app.use(favicon(__dirname + '/assets/images/favicon1.png'));
      this.view();
      this.route();
    },
    killChild: function(code) {
      _.forEach(this.process, function(c) {
        try {
          c.kill('SIGINT');
        } catch (e) {
          console.log("unable to kill child", e.stack)
        }

      })
    },
    model:function() {
      var self = this
      var models = require('include-all')({
        dirname     :  path.join(self.options.frameworkPath, 'models'),
        filter      :  /(.+)\.js$/,
        excludeDirs :  /^\.(git|svn)$/
      });
      _.forEach(models, function(modelObj,name){
        model(name,modelObj).init()
      })
    },
    view: function() {
      app.set('views', path.join(this.options.frameworkPath, this.config.view.template));
      app.set('view engine', this.config.view.engine);
    },
    middleware: function() {
      var self = this
      app.use(express.static(path.join(this.options.rootPath, this.config.http.staticPath)));
      _.forEach(this.config.http.order, function(value) {
        if(_.isObject(value)) {
          app.use(value.route,self.config.http.middleware[value.middleware])
        } else
          app.use(self.config.http.middleware[value])
      });
    },
    route: function() {
      var self = this
      app.use(function(req,res,done) {
        if(req.method == 'GET') {
          match({ routes:Routes, location: req.url }, (error, redirectLocation, renderProps) => {
            if (error) {
              res.status(500).send(error.message)
            } else if (redirectLocation) {
              res.redirect(302, redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {
              res.view = (view,param)=>{
                const store = createStore(texty,res.getState(),applyMiddleware(thunk))
                const html = renderToString(
                  <Provider store={store}>
                    { <RouterContext {...renderProps}/> }
                  </Provider>
                )
                let head = Helmet.rewind();
                const initialState = store.getState()
                if(!_.isObject(param)) {
                  param = {}
                }
                if(!_.isEmpty(view)) {
                  res.render('layout/index', {reactHtml:html,preloadedState:encodeURIComponent(JSON.stringify(initialState))}, function(err,html) {
                    var newParams = Map(param).merge({reactHtml:html,header:head})
                    res.render(view,newParams, function(err,html) {
                      res.render(self.config.view.layout,Map(param).merge({body:html,header:head}))
                    })
                  })
                }
                else {
                  res.render('layout/index', {reactHtml:html,preloadedState:encodeURIComponent(JSON.stringify(initialState))}, function(err,html) {
                    var newParams = Map(param).merge({body:html}).toObject()
                    newParams['header'] = head
                    res.render(self.config.view.layout,newParams)
                  })
                }
              }
            }
            done()
          })
        }
      })
      _.map(this.config.route, function(controller,route) {
        var routeArray = _.split(route,' ',2);
        var defaultMethod = 'get';
        var routePath = routeArray[0];
        if(_.size(routeArray)>1) {
          defaultMethod = _.toLower(routeArray[0]);
          routePath = routeArray[1];
        }
        var controllerArray = _.split(controller,'.',2);
        var defaultAction = 'index';
        if(_.size(controllerArray)>1) {
          defaultAction = controllerArray[1];
        }
        var ctrl = require(path.join(options.frameworkPath,'controllers',controllerArray[0]+"Controller"));
        var func = ctrl[defaultAction]
        app[defaultMethod](routePath,func)
      });
      app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
      });

      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: {}
        });
      });

    }
  }
}
