(function routingServerInit(module) {
    'use strict';

    var moduleName = 'routing';

    var getFullDomain = function (location) {
        return location.protocol + '//' + location.host;
    };

    module.exports = {
        init: function (app, window, $, _, ajax, browser, router, page, undefined) {
            var routing = {
                router: null,
                init: function (data, cb) {
                    var getServerObject = function (handler) {
                        return {
                            server: data.server,
                            log: data.log,
                            req: handler.req,
                            res: handler.res
                        };
                    };

                    var routes = {};

                    // Home route
                    routes['/'] = (function () {
                        var handler = function () {
                            page.render(_.extend({}, {
                                routeData: {pageName: 'home'}
                            }, getServerObject(this)));
                        };

                        return {get: handler};
                    })();

                    // Home route
                    routes['/(home|index)'] = (function () {
                        var handler = function () {
                            page.render(_.extend({
                                routeData: {pageName: 'home'}
                            }, getServerObject(this)));
                        };

                        return {get: handler};
                    })();

                    // About route
                    routes['/about'] = (function () {
                        var handler = function () {
                            page.render(_.extend({
                                routeData: {pageName: 'about'}
                            }, getServerObject(this)));
                        };

                        return {get: handler};
                    })();

                    // Contact route
                    routes['/contact'] = (function () {
                        var handler = function () {
                            page.render(_.extend({
                                routeData: {pageName: 'contact'}
                            }, getServerObject(this)));
                        };

                        return {get: handler};
                    })();

                    routes['/api'] = {
                        '/terms': {
                            get: function () {
                                var that = this;

                                var id = (that.req.query.id || '').trim();
                                var pageName = (that.req.query.pageName || '').trim();
                                var data = {};

                                if (id === 'widget-header') {
                                    data = {
                                        title: 'SPA Sushi'
                                    };
                                } else if (id === 'widget-content') {
                                    data = {
                                        termGoBack: '<< Go back'
                                    };
                                } else if (id === 'widget-footer') {
                                    data = {
                                        text: '&copy; 2013 Alexandr Marinenko'
                                    };
                                } else if (id === 'widget-links') {
                                    data = {
                                        items: [
                                            {page: 'home', name: 'Home'},
                                            {page: 'about', name: 'About'},
                                            {page: 'contact', name: 'Contact'}
                                        ]
                                    };
                                } else if (id === 'widget-info') {
                                    if (pageName === 'about') {
                                        data = {
                                            text: 'You\'re on <span class="highlight js-highlight">About</span> page.'
                                        };
                                    } else if (pageName === 'contact') {
                                        data = {
                                            text: 'You\'re on <span class="highlight js-highlight">Contact</span> page.'
                                        };
                                    }
                                }

                                that.res.set('Content-Type', 'application/json');
                                that.res.json(200, data);
                            }
                        }
                    };

                    routing.router = new router.http.Router(routes);

                    data.server.use(function routerMiddleware(req, res, next) {
                        routing.router.dispatch(req, res, function (err) {
                            if (err) {
                                page.render(_.extend({
                                    routeData: {
                                        pageName: 'not-found'
                                    }
                                }, getServerObject(this)));
                            }
                        });
                    });

                    if (cb && typeof cb === 'function') {
                        cb(data);
                    }
                }
            };

            if ('bus' in app) {
                app.bus.on(app.namespace + '::' + moduleName + '::init', function (data, cb) {
                    routing.init(data, cb);
                });
            }

            return routing;
        }
    };
})(module);