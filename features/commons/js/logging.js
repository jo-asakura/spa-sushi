(function loggingInit(module) {
    'use strict';

    module.exports = {
        init: function (app, _, ajax, browser, undefined) {
            var logging = {
                log: function (message, data, cb) {
                    ajax.post({
                        url: '/api/error',
                        data: {
                            message: message,
                            data: _.extend(data, {
                                url: window.location.href,
                                browser: ('getInfo' in browser) ? browser.getInfo() : null
                            })
                        }
                    }, cb);
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::logging::log', function (message, data, cb) {
                    logging.log(message, data, cb);
                });
            }

            return logging;
        }
    };
})(module);