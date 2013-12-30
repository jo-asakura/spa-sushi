(function widgetInfoPresenterInit(module) {
    'use strict';

    var moduleName = 'widget-info';

    module.exports = {
        init: function (app, window, $, _, undefined) {
            var presenter = {
                render: function (data, cb) {
                    app.bus.emit(app.namespace + '::' + moduleName + '::get', {
                        id: data.id,
                        pageName: data.pageName
                    }, function (errGet, dataGet) {
                        var html = app.templates[moduleName + '/main'].render(_.extend({}, data, dataGet));

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