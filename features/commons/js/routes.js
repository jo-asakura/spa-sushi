(function routesDefinitionInit(module) {
    'use strict';

    module.exports = {
        init: function (undefined) {
            return {
                '/': {
                    routeData: {pageName: 'home'}
                },
                '/(home|index)': {
                    routeData: {pageName: 'home'}
                },
                '/about': {
                    routeData: {pageName: 'about'}
                },
                '/contact': {
                    routeData: {pageName: 'contact'}
                }
            };
        }
    };
})(module);