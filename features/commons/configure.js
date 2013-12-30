(function commonConfigure(module) {
    'use strict';

    module.exports = {
        configure: function (container, isServerSide) {
            if (isServerSide) {
                container
                    .define({
                        name: 'ajax',
                        type: require('./js/ajax-server.js').init,
                        category: 'commons',
                        deps: ['app', 'window', '$', '_', 'http', 'https'],
                        singleton: true
                    })
                    .define({
                        name: 'routing',
                        type: require('./js/routing-server.js').init,
                        category: 'commons',
                        deps: ['app', 'window', '$', '_', 'ajax', 'browser', 'router', 'page'],
                        singleton: true
                    });
            } else {
                container
                    .define({
                        name: 'ajax',
                        type: require('./js/ajax-client.js').init,
                        category: 'commons',
                        deps: ['app', 'window', '$', '_', 'http', 'https'],
                        singleton: true
                    })
                    .define({
                        name: 'routing',
                        type: require('./js/routing-client.js').init,
                        category: 'commons',
                        deps: ['app', 'window', '$', '_', 'ajax', 'browser', 'router', 'page'],
                        singleton: true
                    });
            }

            container
                .define({
                    name: 'browser',
                    type: require('./js/browser.js').init,
                    category: 'commons',
                    deps: ['app', 'window', '$'],
                    singleton: true
                })
                .define({
                    name: 'logging',
                    type: require('./js/logging.js').init,
                    category: 'commons',
                    deps: ['app', '_', 'ajax', 'browser'],
                    singleton: true
                })
                .define({
                    name: 'page',
                    type: require('./js/page.js').init,
                    category: 'commons',
                    deps: ['app', 'window', '$', '_', 'async', 'browser'],
                    singleton: true
                })
                .define({
                    name: 'utils',
                    type: require('./js/utils.js').init,
                    category: 'commons',
                    deps: ['app', 'window', '$', '_', 'browser'],
                    singleton: true
                });
        }
    };
})(module);