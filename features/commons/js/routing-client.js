(function routingClientInit(module) {
    'use strict';

    var moduleName = 'routing';

    var getRegExSlashOrQueryString = function () {
        return '((\/)|(\\?.*))?';
    };

    var getFullDomain = function (location) {
        return location.protocol + '//' + location.host;
    };

    module.exports = {
        init: function (app, window, $, _, ajax, browser, router, routesDict, page, undefined) {
            var routing = {
                router: null,
                init: function (data, cb) {
                    var routes = _.reduce(routesDict, function (memo, data, route) {
                        memo[route + getRegExSlashOrQueryString()] = function () {
                            page.render(data);
                        };
                        return memo;
                    }, {});

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