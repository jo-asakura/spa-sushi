(function widgetLinksConfigure(module) {
  'use strict';

  module.exports = {
    'controllers': [
      {
        name: 'widgetLinksController',
        type: require('./js/controller.js').init,
        deps: ['app', 'window', '$', '_', 'ajax']
      }
    ],
    'presenters': [
      {
        name: 'widgetLinksPresenter',
        type: require('./js/presenter.js').init,
        deps: ['app', 'window', '$', '_']
      }
    ],
    'wireups': [
      {
        name: 'widgetLinksWireup',
        type: require('./js/wireup.js').init,
        deps: ['app', 'window', '$', '_']
      }
    ]
  };
})(module);
