(function widgetInfoConfigure(module) {
    'use strict';

    module.exports = {
        configure: function (container) {
            container
                .define({
                    name: 'widgetInfoController',
                    type: require('./js/controller.js').init,
                    category: 'controllers',
                    deps: ['app', 'window', '$', '_', 'ajax'],
                    singleton: true
                })
                .define({
                    name: 'widgetInfoPresenter',
                    type: require('./js/presenter.js').init,
                    category: 'presenters',
                    deps: ['app', 'window', '$', '_'],
                    singleton: true
                })
                .define({
                    name: 'widgetInfoWireup',
                    type: require('./js/wireup.js').init,
                    category: 'wireups',
                    deps: ['app', 'window', '$', '_'],
                    singleton: true
                });
        }
    };
})(module);