/*
 * walk
 *
 * Copyright (c) 2013 Alexandr Marinenko
 * Licensed under the MIT license.
 */
(function walkInit(module) {
    'use strict';

    var _ = require('underscore');
    var fs = require('fs');

    var obj = {
        match: function (path, matchRule) {
            var result = [];

            var stats = fs.statSync(path);
            if (stats.isFile()) {
                var match = path.match(matchRule) || [];
                if (match.length === 1) {
                    result.push(path);
                }
            } else if (stats.isDirectory()) {
                var list = fs.readdirSync(path) || [];
                list.forEach(function (dir) {
                    result = _.union(result, obj.match(path + '/' + dir, matchRule));
                });
            }

            return result;
        }
    };

    module.exports = {
        match: function (path, matchRule) {
            return obj.match(path, matchRule);
        }
    };
})(module);