(function widgetSocialWireupInit(module) {
    'use strict';

    var moduleName = 'widget-social';
    var animationTimeout = 250;

    module.exports = {
        init: function (app, window, $, _, undefined) {
            var wireup = function (data, cb) {
                var container = data.container;

                if (cb && typeof cb === 'function') {
                    cb(null, data);
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