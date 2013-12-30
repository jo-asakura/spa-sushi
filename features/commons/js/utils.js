(function utilsInit(module) {
    'use strict';

    module.exports = {
        init: function (app, window, $, _, browser, undefined) {

            /* a little hack for a server side */
            if (!window) {
                window = {};
            }
            if (!window.JSON && JSON) {
                window.JSON = JSON;
            }
            if (!window.Math && Math) {
                window.Math = Math;
            }
            if (!window.RegExp && RegExp) {
                window.RegExp = RegExp;
            }
            /* hack ends */

            var utils = {
                deepCopy: function (obj) {
                    return window.JSON.parse(window.JSON.stringify(obj) || 'null');
                },

                deepExtend: function (dest, source) {
                    if (!dest) {
                        return null;
                    }

                    if (!source) {
                        return dest;
                    }

                    if (typeof source === 'object') {
                        if (!source) {
                            dest = source;
                        } else {
                            for (var key in source) {
                                var destProp = dest[key];
                                var sourceProp = source[key];
                                if (destProp && sourceProp && typeof sourceProp === 'object') {
                                    utils.deepExtend(destProp, sourceProp);
                                } else {
                                    dest[key] = sourceProp;
                                }
                            }
                        }
                    } else {
                        dest = source;
                    }
                    return dest;
                },

                removeProperty: function (obj, propName) {
                    if (obj[propName]) {
                        var result = _.extend({}, obj);
                        delete result[propName];
                        return result;
                    }
                    return obj;
                },

                simplifyObject: function (obj, goLevelDown) {
                    if (!obj) {
                        return null;
                    }

                    var result = {};
                    for (var prop in obj) {
                        if (typeof obj[prop] === 'object') {
                            if (goLevelDown) {
                                result[prop] = utils.simplifyObject(obj[prop], false);
                            }
                        } else if (typeof obj[prop] !== 'function' && typeof obj[prop] !== 'unknown') {
                            result[prop] = obj[prop];
                        }
                    }
                    return result;
                },

                parseNumber: function (str) {
                    if (str) {
                        return +(str.match(/-{0,1}\d+(\.\d+)?/g) || [0])[0];
                    } else {
                        return 0;
                    }
                },

                generateGuid: function () {
                    var numberGroup = function () {
                        return (((1 + window.Math.random()) * 0x10000) | 0).toString(16).substring(1);
                    };
                    return (numberGroup() + numberGroup() + "-" + numberGroup() + "-" + numberGroup() + "-" +
                        numberGroup() + "-" + numberGroup() + numberGroup() + numberGroup());
                },

                isInputEmpty: function (input) {
                    input.removeClass('error');
                    if (input.val() === '') {
                        input.addClass('error');
                        return false;
                    }
                    return true;
                },

                isInputEmailValid: function (input) {
                    input.removeClass('error');
                    if (!utils.validateEmail(input.val())) {
                        input.addClass('error');
                        return false;
                    }
                    return true;
                },

                validateEmail: function (email) {
                    var regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return regEx.test(email);
                },

                loadScript: function (src, cb, id) {
                    /// <summary>
                    /// Loads script in async way and executes callback once it's loaded
                    /// </summary>

                    if (window && window.document) {
                        /* async isn't properly supported by IE8/9 */
                        var isAsync = !browser.ie8 && !browser.ie9;

                        var script = window.document.createElement('script');
                        script.src = src;
                        script.type = 'text/javascript';

                        if (id) {
                            script.setAttribute('id', id);
                        }

                        if (isAsync) {
                            script.async = 'true';

                            var callback = function () {
                                var rs = this.readyState;
                                if (rs && rs != 'complete' && rs != 'loaded') {
                                    return;
                                }
                                if (cb && typeof cb === 'function') {
                                    cb();
                                }
                            };

                            if (script.addEventListener) {
                                script.addEventListener('load', callback, false);
                            } else if (script.readyState) {
                                script.onreadystatechange = callback;
                            }
                        }

                        var placeholder = window.document.getElementsByTagName('script')[0];
                        placeholder.parentNode.insertBefore(script, placeholder);

                        if (!isAsync) {
                            if (cb && typeof cb === 'function') {
                                cb();
                            }
                        }
                    }
                },

                placeScript: function (code, cb, id) {
                    /// <summary>
                    /// Places script in async way and executes callback once it's loaded
                    /// </summary>

                    if (window && window.document) {
                        /* async isn't properly supported by IE8/9 */
                        var isAsync = !browser.ie8 && !browser.ie9;

                        var script = window.document.createElement('script');
                        script.innerHTML = code;
                        script.type = 'text/javascript';

                        if (id) {
                            script.setAttribute('id', id);
                        }

                        if (isAsync) {
                            script.async = 'true';
                            var callback = function () {
                                var rs = this.readyState;
                                if (rs && rs != 'complete' && rs != 'loaded') {
                                    return;
                                }
                                if (cb && typeof cb === 'function') {
                                    cb();
                                }
                            };

                            if (script.addEventListener) {
                                script.addEventListener('load', callback, false);
                            } else if (script.readyState) {
                                script.onreadystatechange = callback;
                            }
                        }

                        var placeholder = window.document.getElementsByTagName('script')[0];
                        placeholder.parentNode.insertBefore(script, placeholder);

                        if (!isAsync) {
                            if (cb && typeof cb === 'function') {
                                cb();
                            }
                        }
                    }
                },

                isScriptOnPage: function (src) {
                    if (window && window.document) {
                        return _.chain(window.document.getElementsByTagName('script'))
                            .map(function (s) { return s.getAttribute('src') || ''; })
                            .filter(function (s) { return s.indexOf(src) >= 0; })
                            .value().length > 0;
                    }
                    return false;
                },

                isRegExTrue: function (value, pattern) {
                    return new window.RegExp(pattern).test(value);
                }
            };

            return utils;
        }
    };
})(module);