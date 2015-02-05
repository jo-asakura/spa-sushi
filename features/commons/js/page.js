(function pageInit(module) {
    'use strict';

    var contentSelector = '#site-wrapper';
    var animationTimeout = 250;

    module.exports = {
        init: function (app, window, $, _, async, browser, undefined) {
            var getHtml = function () {
                var html = $(window.document.documentElement);
                if (html.length === 0) {
                    html = $('html');
                }
                return html;
            };

            var page = {
                render: function (data, cb) {
                    if (window && window.document) {
                        getHtml()
                            .find('#content').hide().end()
                            .find('#loader').fadeIn(animationTimeout);
                    }

                    var routeData = data.routeData;
                    async.parallel({
                        'widget-header': function (cb) {
                            app.bus.emit(app.namespace + '::widget-header::render', routeData, cb);
                        },
                        'widget-content': function (cb) {
                            app.bus.emit(app.namespace + '::widget-content::render', routeData, cb);
                        },
                        'widget-footer': function (cb) {
                            app.bus.emit(app.namespace + '::widget-footer::render', routeData, cb);
                        }
                    }, function (err, asyncData) {
                        /* server side renders a whole page */
                        if (data && data.server && data.res) {
                            var server = data.server;
                            var res = data.res;

                            var html = app.templates['commons/layout'].render(_.extend({
                                appName: server.get('appName'),
                                env: server.get('env'),
                                pageName: routeData.pageName,
                                styles: ['/css/style.css'],
                                scripts: ['/js/script.js', '/js/underscore-min.js']
                            }, asyncData));

                            console.log('!!! >>>', app.templates['commons/layout'].render({}));

                            res.set('Content-Type', 'text/html');
                            res.send(200, html);
                        } else {
                            /* client side renders only main containers */
                            var html = getHtml();

                            html
                                .attr(app.attrPage, routeData.pageName)
                                .find('#header').html(asyncData['widget-header']).end()
                                .find('#footer').html(asyncData['widget-footer']).end()
                                .find('#content').html(asyncData['widget-content']);

                            html
                                .find('#loader').fadeOut(animationTimeout, function () {
                                    html.find('#content').show();
                                    page.wireup();
                                });
                        }

                        app.bus.emit(app.namespace + '::' + routeData.pageName + '::rendered', data);

                        if (cb && typeof cb === 'function') {
                            cb(data);
                        }
                    });
                },
                renderNotFound: function () {
                    // TODO: not found page implementation
                },
                wireup: function (data, cb) {
                    if (window && window.document) {
                        var html = getHtml();
                        var pageName = html.attr(app.attrPage);
                        async.parallel({
                            'widget-header': function (cb) {
                                app.bus.emit(app.namespace + '::widget-header::wireup', {
                                    pageName: pageName,
                                    container: html.find('#header')
                                }, function (err, data) {
                                    // nothing here, we cannot use async cb in here
                                    // since cb can be triggered multiple times
                                    // depends on how many wireups we have
                                });
                                cb(null, 'widget-header-wired-up');
                            },
                            'widget-content': function (cb) {
                                app.bus.emit(app.namespace + '::widget-content::wireup', {
                                    pageName: pageName,
                                    container: html.find('#content')
                                }, function (err, data) {
                                    // nothing here, we cannot use async cb in here
                                    // since cb can be triggered multiple times
                                    // depends on how many wireups we have
                                });
                                cb(null, 'widget-content-wired-up');
                            },
                            'widget-footer': function (cb) {
                                app.bus.emit(app.namespace + '::widget-footer::wireup', {
                                    pageName: pageName,
                                    container: html.find('#footer')
                                }, function (err, data) {
                                    // nothing here, we cannot use async cb in here
                                    // since cb can be triggered multiple times
                                    // depends on how many wireups we have
                                });
                                cb(null, 'widget-footer-wired-up');
                            }
                        }, function (err, asyncData) {
                            if (cb && typeof cb === 'function') {
                                cb(data);
                            }
                        });
                    }
                }
            };

            if ('bus' in app) {
                app.bus.on(app.namespace + '::app::loaded', function (data, cb) {
                    page.wireup(data, cb);
                });
            }

            return page;
        }
    };
})(module);