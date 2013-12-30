(function widgetInfoControllerInit(module) {
    'use strict';

    var moduleName = 'widget-info';

    module.exports = {
        init: function (app, window, $, _, ajax, undefined) {
            var controller = {
                get: function (data, cb) {
                    ajax.get({
                        url: '/api/terms',
                        data: data
                    }, function (err, response) {
                        if (cb && typeof cb === 'function') {
                            cb(err, response);
                        }
                    });
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::get', function (data, cb) {
                    controller.get(data, cb);
                });
            }

            return controller;
        }
    };
})(module);