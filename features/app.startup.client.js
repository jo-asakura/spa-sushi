// Application's startup (an entry point) on a client side
// ------------
(function appStartupClientSide(window, $, undefined) {
    var wireup = require('./app.wireup.js');
    var container = wireup(window, $, false);

    // Prepare the environment
    if (!('app' in window)) {
        window.app = container.resolve('startup');
    }

    // logging all "loaded" events, just for fun or debugging purposes
    window.app.bus.on(window.app.namespace + '::*::loaded', function (data) {
        console.log('loaded: ', data);
    });

    // init our app on a page load
    $(function () {
        var obj = {id: window.app.namespace};
        window.app.bus.emit(window.app.namespace + '::routing::init', obj, function () {
            window.app.bus.emit(window.app.namespace + '::app::loaded', obj);
        })
    });
})(window, jQuery);