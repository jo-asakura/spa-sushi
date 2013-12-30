(function routingClientInit(module) {
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
                    var getRegExSlashOrQueryString = function () {
                        return '((\/)|(\\?.*))?';
                    };

                    var routes = {};

                    // Home route
                    routes['/' + getRegExSlashOrQueryString()] = (function () {
                        var handler = function () {
                            page.render({
                                routeData: {pageName: 'home'}
                            });
                        };

                        return handler;
                    })();

                    // Home route
                    routes['/(home|index)' + getRegExSlashOrQueryString()] = (function () {
                        var handler = function () {
                            page.render({
                                routeData: {pageName: 'home'}
                            });
                        };

                        return handler;
                    })();

                    // About route
                    routes['/about'] = (function () {
                        var handler = function () {
                            page.render({
                                routeData: {pageName: 'about'}
                            });
                        };

                        return handler;
                    })();

                    // Contact route
                    routes['/contact'] = (function () {
                        var handler = function () {
                            page.render({
                                routeData: {pageName: 'contact'}
                            });
                        };

                        return handler;
                    })();

                    routing.router = router.Router(routes).configure({
                        //run_handler_in_init: false,
                        html5history: browser.features.html5history,
                        run_handler_in_init: false,
                        notfound: function () {
                            page.render({
                                routeData: {pageName: 'not-found'}
                            });
                        }
                    }).init();

                    var html = $(window.document.documentElement);
                    if (html.length === 0) {
                        html = $('html');
                    }

                    html.find('body')
                        .off('click.redirect', '[redirect]')
                        .on('click.redirect', '[redirect]', function (event) {
                            var el = $(event.currentTarget);
                            app.bus.emit(app.namespace + '::routing::navigate', el.attr('redirect'));
                            return true;
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
                app.bus.on(app.namespace + '::' + moduleName + '::navigate', function (url, cb) {
                    if (url) {
                        var domain = getFullDomain(window.location);
                        if (url.indexOf(domain) === 0) {
                            url = url.replace(domain, '');
                        }
                        if (url.indexOf('http:') >= 0 || url.indexOf('https:') >= 0) {
                            /* set a delay before we redirect user to a new page, so tracking can get some time to log */
                            setTimeout(function () { window.location = url; }, 250);
                        } else {
                            routing.router.setRoute(url);
                        }
                    }
                    if (cb && typeof cb === 'function') {
                        cb();
                    }
                });
            }

            return routing;
        }
    };
})(module);