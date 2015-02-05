(function widgetInfoConfigure(module) {
  'use strict';

  module.exports = {
    'controllers': [
      {
        name: 'widgetInfoController',
        type: require('./js/controller.js').init,
        deps: ['app', 'window', '$', '_', 'ajax']
      }
    ],
    'presenters': [
      {
        name: 'widgetInfoPresenter',
        type: require('./js/presenter.js').init,
        deps: ['app', 'window', '$', '_']
      }
    ],
    'wireups': [
      {
        name: 'widgetInfoWireup',
        type: require('./js/wireup.js').init,
        deps: ['app', 'window', '$', '_']
      }
    ]
  };
})(module);
