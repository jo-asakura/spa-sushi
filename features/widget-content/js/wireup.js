(function widgetContentWireupInit(module) {
    'use strict';

    var moduleName = 'widget-content';
    var animationTimeout = 250;

    module.exports = {
        init: function (app, window, $, _, async, structure, undefined) {
            var wireup = function (data, cb) {
                var createAsyncCall = function (features) {
                    return _.reduce(features, function (memo, feature) {
                        memo[feature.id] = function (cb) {
                            app.bus.emit(app.namespace + '::' + feature.id + '::wireup',
                                _.extend({}, data, {container: data.container.find(feature.container)}),
                                cb);
                        };
                        return memo;
                    }, {});
                };

                var asyncCallback = function (err, asyncData) {
                    if (cb && typeof cb === 'function') {
                        cb(null, data);
                    }
                };

                if (structure[data.pageName]) {
                    async.parallel(createAsyncCall(structure[data.pageName]), asyncCallback);
                } else {
                    asyncCallback(null, data);
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::wireup', function (data, cb) {
                    wireup(data, cb);
                });
            }

            return wireup;
        }
    };
})(module);