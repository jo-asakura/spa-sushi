/*
 * log
 *
 * Copyright (c) 2013 Alexandr Marinenko
 * Licensed under the MIT license.
 */
(function logInit(module) {
    'use strict';

    var fs = require('fs');
    var winston = require('winston');

    module.exports = {
        init: function (config, env) {
            var eLog = new (winston.Logger)({
                transports: [new (winston.transports.File)({ filename: config.logErrors || 'log/error.log' })]
            });

            var aLog = new (winston.Logger)({
                transports: [new (winston.transports.File)({ filename: config.logTracking || 'log/action.log' })]
            });

            var fLog = new (winston.Logger)({
                transports: (function () {
                    var transports = [new (winston.transports.File)({ filename: config.logServer || 'log/server-log.log', json: false })];
                    if (env == 'dev') {
                        transports.push(new (winston.transports.Console)());
                    }
                    return transports;
                })()
            });

            return   {
                getWriteStream: function () {
                    return {
                        write: function (message, encoding) {
                            fLog.info(message.trim());
                        }
                    };
                },
                errorLog: eLog,
                actionLog: aLog
            };
        }
    };
})(module);