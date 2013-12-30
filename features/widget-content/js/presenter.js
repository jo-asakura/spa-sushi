(function widgetContentPresenterInit(module) {
    'use strict';

    var moduleName = 'widget-content';

    module.exports = {
        init: function (app, window, $, _, async, structure, undefined) {
            var presenter = {
                render: function (data, cb) {
                    app.bus.emit(app.namespace + '::' + moduleName + '::get', data, function (err, response) {
                        var createAsyncCall = function (features) {
                            return _.reduce(features, function (memo, feature) {
                                memo[feature.id] = function (cb) {
                                    app.bus.emit(app.namespace + '::' + feature.id + '::render', data, cb);
                                };
                                return memo;
                            }, {});
                        };

                        var asyncCallback = function (err, asyncData) {
                            var template = app.templates[moduleName + '/' + data.pageName];
                            var html = template ? template.render(_.extend(response, asyncData)) : '';

                            app.bus.emit(app.namespace + '::' + moduleName + '::loaded', html);

                            if (cb && typeof cb === 'function') {
                                cb(null, html);
                            }
                        };

                        if (structure[data.pageName]) {
                            async.parallel(createAsyncCall(structure[data.pageName]), asyncCallback);
                        } else {
                            asyncCallback(null, {});
                        }
                    });
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::render', function (data, cb) {
                    presenter.render(_.extend(data, {id: moduleName}), cb);
                });
            }

            return presenter;
        }
    };
})(module);