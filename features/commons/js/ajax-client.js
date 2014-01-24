(function ajaxClientInit(module) {
    'use strict';

    module.exports = {
        init: function (app, window, $, _, http, https, undefined) {
            var makeRequest = function (options, cb) {
                $.ajax(_.defaults(options, {
                    headers: {},
                    dataType: 'json',
                    cache: false,
                    success: function (response) {
                        if (cb && typeof cb === 'function') {
                            cb(null, response);
                        }
                    },
                    error: function (error) {
                        if (cb && typeof cb === 'function') {
                            cb(error, null);
                        }
                    }
                }));
            };

            var ajax = {
                'get': function (options, cb) {
                    makeRequest({
                        url: options.url,
                        data: options.data,
                        contentType: options.contentType || 'application/json;charset=utf-8',
                        type: 'get'
                    }, cb);
                },
                'post': function (options, cb) {
                    makeRequest({
                        url: options.url,
                        data: options.data,
                        contentType: options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
                        type: 'post'
                    }, cb);
                },
                'delete': function (options, cb) {
                    makeRequest({
                        url: options.url,
                        data: options.data,
                        contentType: options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
                        type: 'delete'
                    }, cb);
                }
            };

            /* enable support of CORS */
            $.support.cors = true;

            return ajax;
        }
    };
})(module);