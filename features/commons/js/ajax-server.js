(function ajaxServerInit(module) {
    'use strict';

    module.exports = {
        init: function (app, window, $, _, http, https, undefined) {
            var isJson = function (text) {
                return (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
                    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
                    replace(/(?:^|:|,)(?:\s*\[)+/g, '')));
            };

            var makeRequest = function (options, cb) {
                var protocol = options.port === 443 ? https : http;

                // TODO: put it in config.json
                if (!options.hostname) {
                    options.hostname = 'localhost';
                    options.port = 7889;
                }

                if (options.url && !options.path) {
                    options.path = options.url;
                    delete options.url;
                }

                if (options.data) {
                    options.path = options.path + _.reduce(options.data, function (memo, value, name) {
                        return memo + ((_.isNull(value) || _.isUndefined(value) || value === '') ? '' : (name + '=' + value + '&'));
                    }, '?');
                    delete options.data;
                }

                protocol
                    .request(options, function (apiRes) {
                        var data = '';

                        apiRes.on('data', function (chunk) {
                            data += chunk;
                        });

                        apiRes.on('end', function (a, b) {
                            if (cb && typeof cb === 'function') {
                                if (isJson(data)) {
                                    cb(null, JSON.parse(data));
                                } else {
                                    cb({ error: { code: '400', message: 'returned data not Json format', description: 'returned data not Json format' } })
                                }
                            }
                        });

                        apiRes.on('clientError', function (emp, dmp) {
                            console.log("emp", emp);
                            console.log("dmp", dmp);
                        });
                    })
                    .on('error', function (err) {
                        if (cb && typeof cb === 'function') {
                            cb(err, null);
                        }
                    })
                    .end();
            };

            var ajax = {
                get: function (options, cb) {
                    if (options) {
                        options.method = 'GET';
                        makeRequest(options, cb);
                    }
                },
                post: function (options, cb) {
                    if (options) {
                        options.method = 'POST';
                        makeRequest(options, cb);
                    }
                },
                put: function (options, cb) {
                    if (options) {
                        options.method = 'PUT';
                        makeRequest(options, cb);
                    }
                },
                delete: function (options, cb) {
                    if (options) {
                        options.method = 'DELETE';
                        makeRequest(options, cb);
                    }
                }
            };

            return ajax;
        }
    };
})(module);