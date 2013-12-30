(function widgetHeaderPresenterInit(module) {
    'use strict';

    var moduleName = 'widget-header';

    module.exports = {
        init: function (app, window, $, _, undefined) {
            var presenter = {
                render: function (data, cb) {
                    app.bus.emit(app.namespace + '::' + moduleName + '::get', data, function (err, response) {
                        var html = app.templates[moduleName + '/main'].render(response);

                        app.bus.emit(app.namespace + '::' + moduleName + '::loaded', html);

                        if (cb && typeof cb === 'function') {
                            cb(null, html);
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