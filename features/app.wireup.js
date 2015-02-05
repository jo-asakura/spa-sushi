// Application's wire-up
// ------------
(function appWireup(module) {
  'use strict';

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
      .define({ name: 'window', wrap: { resolve: window || null } })
      .define({ name: '$', wrap: { resolve: $ || null } })
      .define({ name: '_', wrap: { resolve: _ } })
      .define({ name: 'router', wrap: { resolve: director } })
      .define({ name: 'templates', wrap: { resolve: templates } })
      .define({ name: 'async', wrap: { resolve: async } })
      .define({ name: 'http', wrap: { resolve: http } })
      .define({ name: 'https', wrap: { resolve: https } })
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
        }
      })
      .define({ name: 'bus', wrap: { resolve: 'bus', context: 'app' } })
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
