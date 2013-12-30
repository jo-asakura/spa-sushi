// Features server-side wire up
// ------------
(function featuresInit(module) {
    'use strict';

    var Nodeject = require('nodeject');
    var _ = require('underscore');
    var EventEmitter2 = require('eventemitter2').EventEmitter2;
    var director = require('director');
    var templates = require('../build/templates.js');
    var async = require('async');
    var http = require('http');
    var https = require('https');

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

    module.exports = {
        init: function () {
            var container = new Nodeject();
            container
                .define({ name: 'window', type: wrapGlobal(null), singleton: true })
                .define({ name: '$', type: wrapGlobal(null), singleton: true })
                .define({ name: '_', type: wrapGlobal(_), singleton: true })
                .define({ name: 'router', type: wrapGlobal(director), singleton: true })
                .define({ name: 'templates', type: wrapGlobal(templates), singleton: true })
                .define({ name: 'async', type: wrapGlobal(async), singleton: true })
                .define({ name: 'http', type: wrapGlobal(http), singleton: true })
                .define({ name: 'https', type: wrapGlobal(https), singleton: true })
                .define({ name: 'app', type: function () {
                    return {
                        bus: new EventEmitter2({
                            wildcard: true,
                            delimiter: '::'
                        }),
                        isServerSide: true,
                        namespace: 'dashboard',
                        attrPage: 'data-page'
                    };
                }, singleton: true })
                .define({ name: 'bus', type: wrap('bus'), singleton: true, deps: ['app'] })
                .define({
                    name: 'startup',
                    type: function (app, templates) {
                        var resolveDeps = function (container, app, categories) {
                            _.each(categories || [], function (category) {
                                app[category] = container.resolve({
                                    category: category,
                                    format: 'literal'
                                });
                            });
                        };

                        resolveDeps(container, app, ['commons', 'presenters', 'controllers', 'wireups']);

                        // Assign the container
                        app.container = container;
                        app.templates = templates;

                        // Return the initialized app
                        return app;
                    },
                    deps: ['app', 'templates']
                });

            // Wire up features
            var common = require('./commons/configure.js');
            common.configure(container, true);
            var wHeader = require('./widget-header/configure.js');
            wHeader.configure(container);
            var wContent = require('./widget-content/configure.js');
            wContent.configure(container);
            var wFooter = require('./widget-footer/configure.js');
            wFooter.configure(container);

            var wInfo = require('./widget-info/configure.js');
            wInfo.configure(container);
            var wLinks = require('./widget-links/configure.js');
            wLinks.configure(container);
            var wSocial = require('./widget-social/configure.js');
            wSocial.configure(container);

            return container.resolve('startup');
        }
    };
})(module);