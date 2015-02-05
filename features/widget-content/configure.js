(function widgetContentConfigure(module) {
  'use strict';

  module.exports = {
    'controllers': [
      {
        name: 'widgetContentController',
        type: require('./js/controller.js').init,
        deps: ['app', 'window', '$', '_', 'ajax']
      },
      {
        name: 'widgetContentStructure',
        type: require('./js/structure.js').init,
        deps: []
      }
    ],
    'presenters': [
      {
        name: 'widgetContentPresenter',
        type: require('./js/presenter.js').init,
        deps: ['app', 'window', '$', '_', 'async', 'widgetContentStructure']
      }
    ],
    'wireups': [
      {
        name: 'widgetContentWireup',
        type: require('./js/wireup.js').init,
        deps: ['app', 'window', '$', '_', 'async', 'widgetContentStructure']
      }
    ]
  };
})(module);
