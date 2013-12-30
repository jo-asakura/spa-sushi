(function widgetContentConfigure(module) {
    'use strict';

    module.exports = {
        configure: function (container) {
            container
                .define({
                    name: 'widgetContentController',
                    type: require('./js/controller.js').init,
                    category: 'controllers',
                    deps: ['app', 'window', '$', '_', 'ajax'],
                    singleton: true
                })
                .define({
                    name: 'widgetContentPresenter',
                    type: require('./js/presenter.js').init,
                    category: 'presenters',
                    deps: ['app', 'window', '$', '_', 'async', 'widgetContentStructure'],
                    singleton: true
                })
                .define({
                    name: 'widgetContentStructure',
                    type: require('./js/structure.js').init,
                    category: 'controllers',
                    deps: [],
                    singleton: true
                })
                .define({
                    name: 'widgetContentWireup',
                    type: require('./js/wireup.js').init,
                    category: 'wireups',
                    deps: ['app', 'window', '$', '_', 'async', 'widgetContentStructure'],
                    singleton: true
                });
        }
    };
})(module);