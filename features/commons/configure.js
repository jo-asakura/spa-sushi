(function commonConfigure(module) {
  'use strict';

  module.exports = {
    configure: function (isServerSide) {
      var result = {
        'commons': [
          {
            name: 'browser',
            type: require('./js/browser.js').init,
            deps: ['app', 'window', '$']
          },
          {
            name: 'logging',
            type: require('./js/logging.js').init,
            deps: ['app', '_', 'ajax', 'browser']
          },
          {
            name: 'page',
            type: require('./js/page.js').init,
            deps: ['app', 'window', '$', '_', 'async', 'browser']
          },
          {
            name: 'routes',
            type: require('./js/routes.js').init,
            deps: []
          },
          {
            name: 'utils',
            type: require('./js/utils.js').init,
            deps: ['app', 'window', '$', '_', 'browser']
          }
        ]
      };

      if (isServerSide) {
        result['commons'] = result['commons'].concat([
          {
            name: 'ajax',
            type: require('./js/ajax-server.js').init,
            deps: ['app', 'window', '$', '_', 'http', 'https']
          },
          {
            name: 'routing',
            type: require('./js/routing-server.js').init,
            deps: ['app', 'window', '$', '_', 'ajax', 'browser', 'router', 'routes', 'page']
          }
        ]);
      } else {
        result['commons'] = result['commons'].concat([
          {
            name: 'ajax',
            type: require('./js/ajax-client.js').init,
            deps: ['app', 'window', '$', '_', 'http', 'https']
          },
          {
            name: 'routing',
            type: require('./js/routing-client.js').init,
            deps: ['app', 'window', '$', '_', 'ajax', 'browser', 'router', 'routes', 'page']
          }
        ]);
      }

      return result;
    }
  };
})(module);
