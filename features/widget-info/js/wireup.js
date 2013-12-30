(function widgetInfoWireupInit(module) {
    'use strict';

    var moduleName = 'widget-info';
    var animationTimeout = 250;

    module.exports = {
        init: function (app, window, $, _, undefined) {
            var wireup = function (data, cb) {
                var container = data.container;

                container
                    .off('click.' + moduleName, '.js-highlight')
                    .on('click.' + moduleName, '.js-highlight', function (event) {
                        var span = $(event.currentTarget).toggleClass('clicked');
                        return true;
                    });

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