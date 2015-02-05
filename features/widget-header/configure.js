(function widgetHeaderConfigure(module) {
  'use strict';

  module.exports = {
    'controllers': [
      {
        name: 'widgetHeaderController',
        type: require('./js/controller.js').init,
        deps: ['app', 'window', '$', '_', 'ajax']
      }
    ],
    'presenters': [
      {
        name: 'widgetHeaderPresenter',
        type: require('./js/presenter.js').init,
        deps: ['app', 'window', '$', '_']
      }
    ],
    'wireups': [
      {
        name: 'widgetHeaderWireup',
        type: require('./js/wireup.js').init,
        deps: ['app', 'window', '$', '_']
      }
    ]
  };
})(module);
