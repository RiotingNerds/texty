var express = require('express'),
    app = express(),
    routeConfig = require('../configs/route'),
    _ = require('lodash'),
    path = require('path'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser');

import { RouterContext, match } from 'react-router'
import { renderToString } from 'react-dom/server'
import React from 'react'
import thunk from 'redux-thunk';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import texty from '../templates/shop/reducers'
import {Routes} from '../templates/shop/app/router'


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
    
  }
}
