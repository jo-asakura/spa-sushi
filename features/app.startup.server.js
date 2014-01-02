// Application's startup (an entry point) on a server side
// ------------
(function appStartupServerSide(module) {
    'use strict';

    var wireup = require('./app.wireup.js');

    module.exports = {
        init: function () {
            var container = wireup(null, null, true);
            return container.resolve('startup');
        }
    };
})(module);