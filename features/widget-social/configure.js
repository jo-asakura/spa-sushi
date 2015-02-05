(function widgetSocialConfigure(module) {
  'use strict';

  module.exports = {
    'controllers': [
      {
        name: 'widgetSocialController',
        type: require('./js/controller.js').init,
        deps: ['app', 'window', '$', '_', 'ajax']
      }
    ],
    'presenters': [
      {
        name: 'widgetSocialPresenter',
        type: require('./js/presenter.js').init,
        deps: ['app', 'window', '$', '_']
      }
    ],
    'wireups': [
      {
        name: 'widgetSocialWireup',
        type: require('./js/wireup.js').init,
        deps: ['app', 'window', '$', '_']
      }
    ]
  };
})
(module);
