var express = require('express'),
    app = express(),
    routeConfig = require('../configs/route'),
    _ = require('lodash'),
    path = require('path'),
    middlewareConfig = require('../configs/middleware'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser');

/*
import { RouterContext, match } from 'react-router'
import { renderToString } from 'react-dom/server'
import React from 'react'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import workWithApp from '../../react_component/reducers'
import {Routes} from '../../react_component/router'
*/


module.exports = function(options) {
  var controllerRequire = {};
  return {
    init: function() {
      app.set('appOptions',options)
      this.middleware();
      this.view();
      this.route();
      return app;
    },
    view: function() {
      app.set('views', path.join(options.frameworkPath, 'views'));
      app.set('view engine', 'ejs');
    },
    middleware: function() {
      //app.use(favicon(path.join(rootPath, 'public', 'favicon.ico')));
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(express.static(path.join(options.appPath, 'public')));
      _.forEach(middlewareConfig.order, function(value) {
        app.use(middlewareConfig.middleware[value])
      });
    },
    route: function() {
      _.map(routeConfig, function(controller,route) {
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

/*
      app.all('/admin/*', function(req,res) {
        match({ routes:Routes, location: req.url }, (error, redirectLocation, renderProps) => {
          if (error) {
            res.status(500).send(error.message)
          } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
          } else if (renderProps) {
            // You can also check renderProps.components or renderProps.routes for
            // your "not found" component or route respectively, and send a 404 as
            // below, if you're using a catch-all route.

            const store = createStore(workWithApp)
            const initialState = store.getState()
            const html = renderToString(
                <Provider store={store}>
                  { <RouterContext {...renderProps}/> }
                </Provider>
            )
            res.view('homepage',{root:html})
          } else {
            res.status(404).send('Not found')
          }
        })
      })
*/

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