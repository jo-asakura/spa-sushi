// Application's wire-up
// ------------
(function appWireup(module) {
  'use strict';

  var wrapGlobal = function (obj) {
    return function () {
      return obj;
    };
  };

  var wrap = function (name) {
    return function (obj) {
      return obj[name];
    };
  };

  module.exports = function (window, $, isServerSide, undefined) {
    var Nodeject = require('nodeject');
    var _ = require('underscore');
    var EventEmitter2 = require('eventemitter2').EventEmitter2;
    var director = require('director');
    var templates = require('../build/templates.js');
    var async = require('async');
    var http = require('http');
    var https = require('https');

    var container = new Nodeject({ singleton: true });
    container
      .define({ name: 'window', type: wrapGlobal(window), singleton: true })
      .define({ name: '$', type: wrapGlobal($), singleton: true })
      .define({ name: '_', type: wrapGlobal(_), singleton: true })
      .define({ name: 'router', type: wrapGlobal(director), singleton: true })
      .define({ name: 'templates', type: wrapGlobal(templates), singleton: true })
      .define({ name: 'async', type: wrapGlobal(async), singleton: true })
      .define({ name: 'http', type: wrapGlobal(http), singleton: true })
      .define({ name: 'https', type: wrapGlobal(https), singleton: true })
      .define({
        name: 'app', type: function () {
          return {
            bus: new EventEmitter2({
              wildcard: true,
              delimiter: '::'
            }),
            isServerSide: isServerSide,
            namespace: 'spa-sushi',
            attrPage: 'data-page'
          };
        }, singleton: true
      })
      .define({ name: 'bus', type: wrap('bus'), singleton: true, deps: ['app'] })
      .define({
        name: 'startup',
        type: function (app, templates) {
          (function resolveDependencies(container, app) {
            var categories = ['commons', 'presenters', 'controllers', 'wireups'];
            categories.forEach(function (category) {
              app[category] = container.resolve({
                category: category,
                format: 'literal'
              });
            });
          })(container, app);

          // Assign the container
          app.container = container;
          app.templates = templates;

          // Return the initialized app
          return app;
        },
        deps: ['app', 'templates']
      });

    function addToList(aggr, obj) {
      aggr = aggr || {};
      if (obj) {
        _.keys(obj || []).forEach(function (category) {
          aggr[category] = aggr[category] || [];
          aggr[category] = aggr[category].concat(obj[category]);
        });
      }
      return aggr;
    }

    // Wire up features
    var configs = {};

    var commons = require('./commons/configure.js');
    addToList(configs, commons.configure(isServerSide));
    var wHeader = require('./widget-header/configure.js');
    addToList(configs, wHeader);
    var wContent = require('./widget-content/configure.js');
    addToList(configs, wContent);
    var wFooter = require('./widget-footer/configure.js');
    addToList(configs, wFooter);

    var wInfo = require('./widget-info/configure.js');
    addToList(configs, wInfo);
    var wLinks = require('./widget-links/configure.js');
    addToList(configs, wLinks);
    var wSocial = require('./widget-social/configure.js');
    addToList(configs, wSocial);

    _.keys(configs || []).forEach(function (category) {
      (configs[category] || []).forEach(function (item) {
        container.define(_.extend({ category: category }, item));
      });
    });

    return container;
  };
})(module);
