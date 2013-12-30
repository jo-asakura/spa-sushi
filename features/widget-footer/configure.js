(function widgetFooterConfigure(module) {
    'use strict';

    module.exports = {
        configure: function (container) {
            container
                .define({
                    name: 'widgetFooterController',
                    type: require('./js/controller.js').init,
                    category: 'controllers',
                    deps: ['app', 'window', '$', '_', 'ajax'],
                    singleton: true
                })
                .define({
                    name: 'widgetFooterPresenter',
                    type: require('./js/presenter.js').init,
                    category: 'presenters',
                    deps: ['app', 'window', '$', '_'],
                    singleton: true
                })
                .define({
                    name: 'widgetFooterWireup',
                    type: require('./js/wireup.js').init,
                    category: 'wireups',
                    deps: ['app', 'window', '$', '_'],
                    singleton: true
                });
        }
    };
})(module);