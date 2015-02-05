(function widgetFooterConfigure(module) {
  'use strict';

  module.exports = {
    'controllers': [
      {
        name: 'widgetFooterController',
        type: require('./js/controller.js').init,
        deps: ['app', 'window', '$', '_', 'ajax']
      }
    ],
    'presenters': [
      {
        name: 'widgetFooterPresenter',
        type: require('./js/presenter.js').init,
        deps: ['app', 'window', '$', '_']
      }
    ],
    'wireups': [
      {
        name: 'widgetFooterWireup',
        type: require('./js/wireup.js').init,
        deps: ['app', 'window', '$', '_']
      }
    ]
  };
})(module);
