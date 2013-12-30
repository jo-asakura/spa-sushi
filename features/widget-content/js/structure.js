(function widgetContentStructureInit(module) {
    'use strict';

    module.exports = {
        init: function (undefined) {
            return {
                'home': [
                    {
                        id: 'widget-links',
                        container: '.links-container'
                    }
                ],
                'about': [
                    {
                        id: 'widget-info',
                        container: '.info-container'
                    }
                ],
                'contact': [
                    {
                        id: 'widget-info',
                        container: '.info-container'
                    },
                    {
                        id: 'widget-social',
                        container: '.social-container'
                    }
                ]
            };
        }
    };
})(module);