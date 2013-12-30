/*
 * less-combiner
 *
 * Copyright (c) 2013 Alexandr Marinenko
 * Licensed under the MIT license.
 */
(function lessCombinerInit(module) {
    'use strict';

    var _ = require('underscore');
    var fs = require('fs');
    var walk = require('./walk.js');

    module.exports = {
        combine: function (options) {
            var defaults = {
                paths: ['.'],
                outputFileName: './style.less',
                recursively: true,
                includeCss: true,
                getMatchRule: function () {
                    return this.includeCss ? /\.(css|less)$/gi : /\.less$/gi;
                }
            };

            options = _.defaults(options, defaults);

            var files = _.reduce(options.paths, function (memo, path) {
                return _.union(memo, walk.match(path, options.getMatchRule()) || []);
            }, []);

            var output = _.reduce(files, function (memo, path) {
                return memo + '@import "' + path + '";\r\n';
            }, '@charset "utf-8";\r\n\r\n');

            fs.writeFileSync(options.outputFileName, '\ufeff' + output, {encoding: 'utf8'});
            return true;
        }
    };
})(module);