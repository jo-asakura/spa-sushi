(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Hogan = require("hogan.js");; this["Templates"] = this["Templates"] || {};
this["Templates"]["commons/layout"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<!DOCTYPE html><html lang=\"en-US\" class=\"");_.b(_.v(_.f("env",c,p,0)));_.b("\" data-page=\"");_.b(_.v(_.f("pageName",c,p,0)));_.b("\"><head><!--[if IE 7]><script>document.documentElement.className += \" ie ie7\";</script><![endif]--><!--[if IE 8]><script>document.documentElement.className += \" ie ie8\";</script><![endif]--><!--[if IE 9]><script>document.documentElement.className += \" ie ie9\";</script><![endif]--><!--[if IE]><script src=\"/js/html5shiv.js\"></script><![endif]--><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\"><meta name=\"msapplication-tap-highlight\" content=\"no\"><title>");_.b(_.v(_.f("appName",c,p,0)));_.b("</title>");if(_.s(_.f("styles",c,p,1),c,p,0,719,755,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<link rel=\"stylesheet\" href=\"");_.b(_.v(_.d(".",c,p,0)));_.b("\">");});c.pop();}_.b("<script src=\"/js/jquery-1.10.2.min.js\" type=\"text/javascript\"></script></head><body><div id=\"site-wrapper\" role=\"application\"><header id=\"header\" role=\"banner\">");_.b(_.t(_.f("widget-header",c,p,0)));_.b("</header><main id=\"content\" role=\"main\">");_.b(_.t(_.f("widget-content",c,p,0)));_.b("</main><div id=\"loader\" role=\"complementary\"><img src=\"/img/loader_blue_32.gif\" class=\"loader js-loader\"></div><footer id=\"footer\" role=\"contentinfo\">");_.b(_.t(_.f("widget-footer",c,p,0)));_.b("</footer></div>");if(_.s(_.f("scripts",c,p,1),c,p,0,1201,1253,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<script type=\"text/javascript\" src=\"");_.b(_.v(_.d(".",c,p,0)));_.b("\"></script>");});c.pop();}_.b("</body></html>");return _.fl();;});
this["Templates"]["widget-content/about"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div class=\"info-container\">");_.b(_.t(_.f("widget-info",c,p,0)));_.b("</div><div class=\"go-back-container\"><a href=\"javascript:void(0)\" redirect=\"/\">");_.b(_.v(_.f("termGoBack",c,p,0)));_.b("</a></div>");return _.fl();;});
this["Templates"]["widget-content/contact"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div class=\"info-container\">");_.b(_.t(_.f("widget-info",c,p,0)));_.b("</div><div class=\"social-container\">");_.b(_.t(_.f("social-details",c,p,0)));_.b("</div><div class=\"go-back-container\"><a href=\"javascript:void(0)\" redirect=\"/\">");_.b(_.v(_.f("termGoBack",c,p,0)));_.b("</a></div>");return _.fl();;});
this["Templates"]["widget-content/home"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div class=\"links-container\">");_.b(_.t(_.f("widget-links",c,p,0)));_.b("</div>");return _.fl();;});
this["Templates"]["widget-footer/main"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<p>");_.b(_.t(_.f("text",c,p,0)));_.b("</p>");return _.fl();;});
this["Templates"]["widget-header/main"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<h2><a href=\"javascript:void(0)\" redirect=\"/\">");_.b(_.v(_.f("title",c,p,0)));_.b("</a></h2>");return _.fl();;});
this["Templates"]["widget-info/main"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<p class=\"info\">");_.b(_.t(_.f("text",c,p,0)));_.b("</p>");return _.fl();;});
this["Templates"]["widget-links/main"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<ul class=\"list-links\">");if(_.s(_.f("items",c,p,1),c,p,0,33,116,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><a href=\"javascript:void(0)\" redirect=\"/");_.b(_.v(_.f("page",c,p,0)));_.b("\">Navigate to ");_.b(_.v(_.f("name",c,p,0)));_.b("</a></li>");});c.pop();}_.b("</ul>");return _.fl();;});
this["Templates"]["widget-social/main"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div></div>");return _.fl();;});

if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = this["Templates"];
}
},{"hogan.js":42}],2:[function(require,module,exports){
// Features client-side wire up
// ------------
(function (window, $, undefined) {
    var Nodeject = require('nodeject');
    var _ = require('underscore');
    var EventEmitter2 = require('eventemitter2').EventEmitter2;
    var director = require('director');
    var async = require('async');
    var templates = require('../build/templates.js');
    var http = {};
    var https = {};

    var wrapGlobal = function (obj) {
        return function () {
            return obj;
        };
    };
    var wrap = function (name) {
        return function (obj) {
            return obj[name];
        };
    };

    var container = new Nodeject();
    container
        .define({ name: 'window', type: wrapGlobal(window), singleton: true })
        .define({ name: '$', type: wrapGlobal($), singleton: true })
        .define({ name: '_', type: wrapGlobal(_), singleton: true })
        .define({ name: 'router', type: wrapGlobal(director), singleton: true })
        .define({ name: 'templates', type: wrapGlobal(templates), singleton: true })
        .define({ name: 'async', type: wrapGlobal(async), singleton: true })
        .define({ name: 'http', type: wrapGlobal(http), singleton: true })
        .define({ name: 'https', type: wrapGlobal(https), singleton: true })
        .define({ name: 'app', type: function () {
            return {
                bus: new EventEmitter2({
                    wildcard: true,
                    delimiter: '::'
                }),
                isClientSide: true,
                namespace: 'dashboard',
                attrPage: 'data-page'
            };
        }, singleton: true })
        .define({ name: 'bus', type: wrap('bus'), singleton: true, deps: ['app'] })
        .define({
            name: 'startup',
            type: function (app, templates) {
                var resolveDeps = function (container, app, categories) {
                    _.each(categories || [], function (category) {
                        app[category] = container.resolve({
                            category: category,
                            format: 'literal'
                        });
                    });
                };

                resolveDeps(container, app, ['commons', 'presenters', 'controllers', 'wireups']);

                // Assign the container
                app.container = container;
                app.templates = templates;
                window.app = app;

                // Return the initialized app
                return app;
            },
            deps: ['app', 'templates']
        });

    // Wire up features
    var common = require('./commons/configure.js');
    common.configure(container);
    var wHeader = require('./widget-header/configure.js');
    wHeader.configure(container);
    var wContent = require('./widget-content/configure.js');
    wContent.configure(container);
    var wFooter = require('./widget-footer/configure.js');
    wFooter.configure(container);

    var wInfo = require('./widget-info/configure.js');
    wInfo.configure(container);
    var wLinks = require('./widget-links/configure.js');
    wLinks.configure(container);
    var wSocial = require('./widget-social/configure.js');
    wSocial.configure(container);

    // Prepare the environment
    if (!('app' in window)) {
        window.app = container.resolve('startup');
    }

    if (!('require' in window)) {
        window.require = require;
    }

    app.bus.on(app.namespace + '::*::loaded', function (data) {
        console.log('loaded: ', data);
    });

    $(function () {
        var obj = {id: app.namespace};
        app.bus.emit(app.namespace + '::routing::init', obj, function () {
            app.bus.emit(app.namespace + '::app::loaded', obj);
        })
    });
})(window, jQuery);
},{"../build/templates.js":1,"./commons/configure.js":3,"./widget-content/configure.js":12,"./widget-footer/configure.js":17,"./widget-header/configure.js":21,"./widget-info/configure.js":25,"./widget-links/configure.js":29,"./widget-social/configure.js":33,"async":37,"director":38,"eventemitter2":39,"nodeject":44,"underscore":45}],3:[function(require,module,exports){
(function commonConfigure(module) {
    'use strict';

    module.exports = {
        configure: function (container, isServerSide) {
            if (isServerSide) {
                container
                    .define({
                        name: 'ajax',
                        type: require('./js/ajax-server.js').init,
                        category: 'commons',
                        deps: ['app', 'window', '$', '_', 'http', 'https'],
                        singleton: true
                    })
                    .define({
                        name: 'routing',
                        type: require('./js/routing-server.js').init,
                        category: 'commons',
                        deps: ['app', 'window', '$', '_', 'ajax', 'browser', 'router', 'page'],
                        singleton: true
                    });
            } else {
                container
                    .define({
                        name: 'ajax',
                        type: require('./js/ajax-client.js').init,
                        category: 'commons',
                        deps: ['app', 'window', '$', '_', 'http', 'https'],
                        singleton: true
                    })
                    .define({
                        name: 'routing',
                        type: require('./js/routing-client.js').init,
                        category: 'commons',
                        deps: ['app', 'window', '$', '_', 'ajax', 'browser', 'router', 'page'],
                        singleton: true
                    });
            }

            container
                .define({
                    name: 'browser',
                    type: require('./js/browser.js').init,
                    category: 'commons',
                    deps: ['app', 'window', '$'],
                    singleton: true
                })
                .define({
                    name: 'logging',
                    type: require('./js/logging.js').init,
                    category: 'commons',
                    deps: ['app', '_', 'ajax', 'browser'],
                    singleton: true
                })
                .define({
                    name: 'page',
                    type: require('./js/page.js').init,
                    category: 'commons',
                    deps: ['app', 'window', '$', '_', 'async', 'browser'],
                    singleton: true
                })
                .define({
                    name: 'utils',
                    type: require('./js/utils.js').init,
                    category: 'commons',
                    deps: ['app', 'window', '$', '_', 'browser'],
                    singleton: true
                });
        }
    };
})(module);
},{"./js/ajax-client.js":4,"./js/ajax-server.js":5,"./js/browser.js":6,"./js/logging.js":7,"./js/page.js":8,"./js/routing-client.js":9,"./js/routing-server.js":10,"./js/utils.js":11}],4:[function(require,module,exports){
(function ajaxClientInit(module) {
    'use strict';

    module.exports = {
        init: function (app, window, $, _, http, https, undefined) {
            var ajax = null;

            var makeRequest = function (options, cb) {
                $.ajax(_.defaults(options, {
                    headers: {},
                    dataType: 'json',
                    cache: false,
                    success: function (response) {
                        if (cb && typeof cb === 'function') {
                            cb(null, response);
                        }
                    },
                    error: function (error) {
                        if (cb && typeof cb === 'function') {
                            cb(error, null);
                        }
                    }
                }));
            };

            ajax = {
                get: function (options, cb) {
                    makeRequest({
                        url: options.url,
                        data: options.data,
                        contentType: options.contentType || 'application/json;charset=utf-8',
                        type: 'get'
                    }, cb);
                },
                post: function (options, cb) {
                    makeRequest({
                        url: options.url,
                        data: options.data,
                        contentType: options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
                        type: 'post'
                    }, cb);
                },
                delete: function (options, cb) {
                    makeRequest({
                        url: options.url,
                        data: options.data,
                        contentType: options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
                        type: 'delete'
                    }, cb);
                }
            };

            /* enable support of CORS */
            $.support.cors = true;

            return ajax;
        }
    };
})(module);
},{}],5:[function(require,module,exports){
(function ajaxServerInit(module) {
    'use strict';

    module.exports = {
        init: function (app, window, $, _, http, https, undefined) {
            var ajax = null;

            var isJson = function (text) {
                return (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
                    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
                    replace(/(?:^|:|,)(?:\s*\[)+/g, '')));
            };

            var makeRequest = function (options, cb) {
                var protocol = options.port === 443 ? https : http;

                // TODO: put it in config.json
                if (!options.hostname) {
                    options.hostname = 'localhost';
                    options.port = 7889;
                }

                if (options.url && !options.path) {
                    options.path = options.url;
                    delete options.url;
                }

                if (options.data) {
                    options.path = options.path + _.reduce(options.data, function (memo, value, name) {
                        return memo + ((_.isNull(value) || _.isUndefined(value) || value === '') ? '' : (name + '=' + value + '&'));
                    }, '?');
                    delete options.data;
                }

                protocol
                    .request(options, function (apiRes) {
                        var data = '';

                        apiRes.on('data', function (chunk) {
                            data += chunk;
                        });

                        apiRes.on('end', function (a, b) {
                            if (cb && typeof cb === 'function') {
                                if (isJson(data)) {
                                    cb(null, JSON.parse(data));
                                } else {
                                    cb({ error: { code: '400', message: 'returned data not Json format', description: 'returned data not Json format' } })
                                }
                            }
                        });

                        apiRes.on('clientError', function (emp, dmp) {
                            console.log("emp", emp);
                            console.log("dmp", dmp);
                        });
                    })
                    .on('error', function (err) {
                        if (cb && typeof cb === 'function') {
                            cb(err, null);
                        }
                    })
                    .end();
            };

            ajax = {
                get: function (options, cb) {
                    if (options) {
                        options.method = 'GET';
                        makeRequest(options, cb);
                    }
                },
                post: function (options, cb) {
                    if (options) {
                        options.method = 'POST';
                        makeRequest(options, cb);
                    }
                },
                put: function (options, cb) {
                    if (options) {
                        options.method = 'PUT';
                        makeRequest(options, cb);
                    }
                },
                delete: function (options, cb) {
                    if (options) {
                        options.method = 'DELETE';
                        makeRequest(options, cb);
                    }
                }
            };

            return ajax;
        }
    };
})(module);
},{}],6:[function(require,module,exports){
(function browserInit(module) {
    'use strict';

    module.exports = {
        init: function (app, window, $, undefined) {
            var browser = {};

            var html = (function () {
                var result = null;
                if (window && window.document && window.document.documentElement) {
                    result = $(window.document.documentElement);
                    if (result.length === 0) {
                        result = $('html');
                    }
                }
                return result;
            })();

            var getUAMatch = function (ua) {
                var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                    /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                    /(msie) ([\w.]+)/.exec(ua) ||
                    ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
                    [];
                return {
                    browser: match[1] || '',
                    version: match[2] || '0'
                };
            };

            // Set current browser info
            // ----------------
            (function setBrowserInfo(browser) {
                if (window && window.navigator && html) {
                    var uaMatch = getUAMatch(window.navigator.userAgent.toLowerCase());

                    var uaBrowser = (function (matched) {
                        var result = {};

                        if (matched.browser) {
                            result[matched.browser] = true;
                            result.version = matched.version;
                        }

                        /* Chrome is Webkit, but Webkit is also Safari */
                        if (result.chrome) {
                            result.webkit = true;
                        } else if (result.webkit) {
                            result.safari = true;
                        }

                        return result;
                    })(uaMatch);

                    var setFlag = function (browser, html, prop) {
                        browser[prop] = true;
                        html.addClass(prop);
                    };

                    if (uaBrowser.msie) {
                        if (uaBrowser.version) {
                            setFlag(browser, html, 'ie' + (+uaBrowser.version).toString());
                        }
                        setFlag(browser, html, 'ie');
                    } else if (uaBrowser.webkit) {
                        setFlag(browser, html, 'webkit');
                        if (uaBrowser.safari) {
                            setFlag(browser, html, 'safari');
                        } else if (uaBrowser.chrome) {
                            setFlag(browser, html, 'chrome');
                        }
                    } else if (uaBrowser.mozilla) {
                        setFlag(browser, html, 'mozilla');
                    }
                }
            })(browser);

            // Set current operating system info
            // ----------------
            (function setOsInfo(browser) {
                if (window && window.navigator && html) {
                    var platform = window.navigator.platform.toLowerCase();
                    browser.os = {
                        isWin: platform.indexOf('win') !== -1,
                        isMac: platform.indexOf('mac') !== -1
                    };
                    if (browser.os.isMac) {
                        html.addClass('mac');
                    } else if (browser.os.isWin) {
                        html.addClass('win');
                    }
                }
            })(browser);

            // Init query string func
            // ----------------
            (function initQueryString(browser) {
                if (window && window.RegExp) {
                    browser.qs = function (name) {
                        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                        var regex = new window.RegExp("[\\?&]" + name + "=([^&#]*)");
                        var results = regex.exec(window.location.search);
                        return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
                    };
                }
            })(browser);

            // Init media queries func
            // ----------------
            (function initMedia(browser) {
                if (window) {
                    browser.media = (function () {
                        var getBodyContent = function () {
                            if ('getComputedStyle' in window) {
                                return window.getComputedStyle(document.body, ':after').getPropertyValue('content')
                                    .replace(/"/g, '')
                                    .replace(/\'/g, '');
                            } else {
                                return 'desktop';
                            }
                        };
                        return {
                            isMobilePortrait: function () {
                                return getBodyContent() === 'mobilePortrait';
                            },
                            isMobileLandscape: function () {
                                return getBodyContent() === 'mobileLandscape';
                            },
                            isTablet: function () {
                                return getBodyContent() === 'tablet';
                            },
                            isDesktop: function () {
                                return getBodyContent() === 'desktop';
                            },
                            getCurrent: function () {
                                return getBodyContent();
                            }
                        };
                    })();
                }
            })(browser);

            // Init cookie func
            // ----------------
            (function initCookie(browser) {
                if (window && window.location && window.document) {
                    var getDomain = function () {
                        return window.location.host.replace('www.', '');
                    };

                    browser.setCookie = function (name, value, path, expires, domain) {
                        if (name) {
                            name = name.toUpperCase();
                        }
                        var newCookie = name + '=' + value + ';';
                        newCookie += ' path=' + (path || '/');
                        if (expires) {
                            newCookie += '; expires=' + expires;
                        }
                        newCookie += '; domain=' + (domain || getDomain());
                        window.document.cookie = newCookie;
                        return true;
                    };

                    browser.getCookie = function (name) {
                        if (name) {
                            name = name.toUpperCase();
                            var i, x, y, cookies = window.document.cookie.split(";");
                            for (i = 0; i < cookies.length; i++) {
                                x = cookies[i].substr(0, cookies[i].indexOf("="));
                                y = cookies[i].substr(cookies[i].indexOf("=") + 1);
                                x = x.replace(/^\s+|\s+$/g, "");
                                if (x === name) {
                                    return unescape(y);
                                }
                            }
                        }
                        return null;
                    };

                    browser.removeCookie = function (name) {
                        return browser.setCookie(name, '0', null, new Date(-1));
                    };
                }
            })(browser);

            // Detect browser features
            // ----------------
            (function initFeatures(browser) {
                if (window && window.navigator && html) {
                    var agent = window.navigator.userAgent || window.navigator.vendor || window.opera;
                    browser.features = {
                        sessionStorage: !!('sessionStorage' in window),
                        mutationObserver: !!(('MutationObserver' in window) || ('WebKitMutationObserver' in window)),
                        touchDevice: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch),
                        html5history: ('history' in window) && ('pushState' in (window.history || {})),
                        isMobileDevice: (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(agent) ||
                            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agent.substr(0, 4)))
                    };
                    html
                        .addClass(browser.features.sessionStorage ? 'sessionStorage' : 'no-sessionStorage')
                        .addClass(browser.features.touchDevice ? 'touch' : 'no-touch')
                        .addClass(browser.features.html5history ? 'html5history' : 'no-html5history')
                        .addClass(browser.features.isMobileDevice ? 'mobile' : 'desktop');
                }
            })(browser);

            // Init other func
            // ----------------
            (function initOtherFunctions(browser) {
                if (window && window.document && window.navigator) {
                    browser.getViewPort = function () {
                        var w = window;
                        var d = w.document;
                        var e = d.documentElement;
                        var b = d.getElementsByTagName('body')[0];
                        return {
                            height: w.innerHeight || e.clientHeight || b.clientHeight,
                            width: w.innerWidth || e.clientWidth || b.clientWidth
                        };
                    };

                    browser.getInfo = function () {
                        var uaMatch = getUAMatch(window.navigator.userAgent.toLowerCase());
                        var viewPort = browser.getViewPort();
                        return {
                            browser: uaMatch.browser.toLowerCase(),
                            version: uaMatch.version.toLowerCase(),
                            viewPortHeight: viewPort.height,
                            viewPortWidth: viewPort.width,
                            mediaQuery: browser.media.getCurrent(),
                            os: window.navigator.platform.toLowerCase(),
                            device: browser.features.isMobileDevice ? 'mobile' : 'desktop'
                        };
                    };
                }
            })(browser);

            return browser;
        }
    };
})(module);
},{}],7:[function(require,module,exports){
(function loggingInit(module) {
    'use strict';

    module.exports = {
        init: function (app, _, ajax, browser, undefined) {
            var logging = {
                log: function (message, data, cb) {
                    ajax.post({
                        url: '/api/error',
                        data: {
                            message: message,
                            data: _.extend(data, {
                                url: window.location.href,
                                browser: ('getInfo' in browser) ? browser.getInfo() : null
                            })
                        }
                    }, cb);
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::logging::log', function (message, data, cb) {
                    logging.log(message, data, cb);
                });
            }

            return logging;
        }
    };
})(module);
},{}],8:[function(require,module,exports){
(function pageInit(module) {
    'use strict';

    var contentSelector = '#site-wrapper';
    var animationTimeout = 250;

    module.exports = {
        init: function (app, window, $, _, async, browser, undefined) {
            var getHtml = function () {
                var html = $(window.document.documentElement);
                if (html.length === 0) {
                    html = $('html');
                }
                return html;
            };

            var page = {
                render: function (data, cb) {
                    if (window && window.document) {
                        getHtml()
                            .find('#content').hide().end()
                            .find('#loader').fadeIn(animationTimeout);
                    }

                    var routeData = data.routeData;
                    async.parallel({
                        'widget-header': function (cb) {
                            app.bus.emit(app.namespace + '::widget-header::render', routeData, cb);
                        },
                        'widget-content': function (cb) {
                            app.bus.emit(app.namespace + '::widget-content::render', routeData, cb);
                        },
                        'widget-footer': function (cb) {
                            app.bus.emit(app.namespace + '::widget-footer::render', routeData, cb);
                        }
                    }, function (err, asyncData) {
                        /* server side renders a whole page */
                        if (data && data.server && data.res) {
                            var server = data.server;
                            var res = data.res;

                            var html = app.templates['commons/layout'].render(_.extend({
                                appName: server.get('appName'),
                                env: server.get('env'),
                                pageName: routeData.pageName,
                                styles: ['/css/style.css'],
                                scripts: ['/js/script.js', '/js/underscore-min.js']
                            }, asyncData));

                            res.set('Content-Type', 'text/html');
                            res.send(200, html);
                        } else {
                            /* client side renders only main containers */
                            var html = getHtml();

                            html
                                .attr(app.attrPage, routeData.pageName)
                                .find('#header').html(asyncData['widget-header']).end()
                                .find('#footer').html(asyncData['widget-footer']).end()
                                .find('#content').html(asyncData['widget-content']);

                            html
                                .find('#loader').fadeOut(animationTimeout, function () {
                                    html.find('#content').show();
                                    page.wireup();
                                });
                        }

                        app.bus.emit(app.namespace + '::' + routeData.pageName + '::rendered', data);

                        if (cb && typeof cb === 'function') {
                            cb(data);
                        }
                    });
                },
                renderNotFound: function () {
                    // ...
                },
                wireup: function (data, cb) {
                    if (window && window.document) {
                        var html = getHtml();
                        var pageName = html.attr(app.attrPage);
                        async.parallel({
                            'widget-header': function (cb) {
                                app.bus.emit(app.namespace + '::widget-header::wireup', {
                                    pageName: pageName,
                                    container: html.find('#header')
                                }, function (err, data) {
                                    // nothing here, we cannot use async cb in here
                                    // since cb can be triggered multiple times
                                    // depends on how many wireups we have
                                });
                                cb(null, 'widget-header-wired-up');
                            },
                            'widget-content': function (cb) {
                                app.bus.emit(app.namespace + '::widget-content::wireup', {
                                    pageName: pageName,
                                    container: html.find('#content')
                                }, function (err, data) {
                                    // nothing here, we cannot use async cb in here
                                    // since cb can be triggered multiple times
                                    // depends on how many wireups we have
                                });
                                cb(null, 'widget-content-wired-up');
                            },
                            'widget-footer': function (cb) {
                                app.bus.emit(app.namespace + '::widget-footer::wireup', {
                                    pageName: pageName,
                                    container: html.find('#footer')
                                }, function (err, data) {
                                    // nothing here, we cannot use async cb in here
                                    // since cb can be triggered multiple times
                                    // depends on how many wireups we have
                                });
                                cb(null, 'widget-footer-wired-up');
                            }
                        }, function (err, asyncData) {
                            if (cb && typeof cb === 'function') {
                                cb(data);
                            }
                        });
                    }
                }
            };

            if ('bus' in app) {
                app.bus.on(app.namespace + '::app::loaded', function (data, cb) {
                    page.wireup(data, cb);
                });
            }

            return page;
        }
    };
})(module);
},{}],9:[function(require,module,exports){
(function routingClientInit(module) {
    'use strict';

    var moduleName = 'routing';

    var getFullDomain = function (location) {
        return location.protocol + '//' + location.host;
    };

    module.exports = {
        init: function (app, window, $, _, ajax, browser, router, page, undefined) {
            var routing = {
                router: null,
                init: function (data, cb) {
                    var getRegExSlashOrQueryString = function () {
                        return '((\/)|(\\?.*))?';
                    };

                    var routes = {};

                    // Home route
                    routes['/' + getRegExSlashOrQueryString()] = (function () {
                        var handler = function () {
                            page.render({
                                routeData: {pageName: 'home'}
                            });
                        };

                        return handler;
                    })();

                    // Home route
                    routes['/(home|index)' + getRegExSlashOrQueryString()] = (function () {
                        var handler = function () {
                            page.render({
                                routeData: {pageName: 'home'}
                            });
                        };

                        return handler;
                    })();

                    // About route
                    routes['/about'] = (function () {
                        var handler = function () {
                            page.render({
                                routeData: {pageName: 'about'}
                            });
                        };

                        return handler;
                    })();

                    // Contact route
                    routes['/contact'] = (function () {
                        var handler = function () {
                            page.render({
                                routeData: {pageName: 'contact'}
                            });
                        };

                        return handler;
                    })();

                    routing.router = router.Router(routes).configure({
                        //run_handler_in_init: false,
                        html5history: browser.features.html5history,
                        run_handler_in_init: false,
                        notfound: function () {
                            page.render({
                                routeData: {pageName: 'not-found'}
                            });
                        }
                    }).init();

                    var html = $(window.document.documentElement);
                    if (html.length === 0) {
                        html = $('html');
                    }

                    html.find('body')
                        .off('click.redirect', '[redirect]')
                        .on('click.redirect', '[redirect]', function (event) {
                            var el = $(event.currentTarget);
                            app.bus.emit(app.namespace + '::routing::navigate', el.attr('redirect'));
                            return true;
                        });

                    if (cb && typeof cb === 'function') {
                        cb(data);
                    }
                }
            };

            if ('bus' in app) {
                app.bus.on(app.namespace + '::' + moduleName + '::init', function (data, cb) {
                    routing.init(data, cb);
                });
                app.bus.on(app.namespace + '::' + moduleName + '::navigate', function (url, cb) {
                    if (url) {
                        var domain = getFullDomain(window.location);
                        if (url.indexOf(domain) === 0) {
                            url = url.replace(domain, '');
                        }
                        if (url.indexOf('http:') >= 0 || url.indexOf('https:') >= 0) {
                            /* set a delay before we redirect user to a new page, so tracking can get some time to log */
                            setTimeout(function () { window.location = url; }, 250);
                        } else {
                            routing.router.setRoute(url);
                        }
                    }
                    if (cb && typeof cb === 'function') {
                        cb();
                    }
                });
            }

            return routing;
        }
    };
})(module);
},{}],10:[function(require,module,exports){
(function routingServerInit(module) {
    'use strict';

    var moduleName = 'routing';

    var getFullDomain = function (location) {
        return location.protocol + '//' + location.host;
    };

    module.exports = {
        init: function (app, window, $, _, ajax, browser, router, page, undefined) {
            var routing = {
                router: null,
                init: function (data, cb) {
                    var getServerObject = function (handler) {
                        return {
                            server: data.server,
                            log: data.log,
                            req: handler.req,
                            res: handler.res
                        };
                    };

                    var routes = {};

                    // Home route
                    routes['/'] = (function () {
                        var handler = function () {
                            page.render(_.extend({}, {
                                routeData: {pageName: 'home'}
                            }, getServerObject(this)));
                        };

                        return {get: handler};
                    })();

                    // Home route
                    routes['/(home|index)'] = (function () {
                        var handler = function () {
                            page.render(_.extend({
                                routeData: {pageName: 'home'}
                            }, getServerObject(this)));
                        };

                        return {get: handler};
                    })();

                    // About route
                    routes['/about'] = (function () {
                        var handler = function () {
                            page.render(_.extend({
                                routeData: {pageName: 'about'}
                            }, getServerObject(this)));
                        };

                        return {get: handler};
                    })();

                    // Contact route
                    routes['/contact'] = (function () {
                        var handler = function () {
                            page.render(_.extend({
                                routeData: {pageName: 'contact'}
                            }, getServerObject(this)));
                        };

                        return {get: handler};
                    })();

                    routes['/api'] = {
                        '/terms': {
                            get: function () {
                                var that = this;

                                var id = (that.req.query.id || '').trim();
                                var pageName = (that.req.query.pageName || '').trim();
                                var data = {};

                                if (id === 'widget-header') {
                                    data = {
                                        title: 'SPA Sushi'
                                    };
                                } else if (id === 'widget-content') {
                                    data = {
                                        termGoBack: '<< Go back'
                                    };
                                } else if (id === 'widget-footer') {
                                    data = {
                                        text: '&copy; 2013 Alexandr Marinenko'
                                    };
                                } else if (id === 'widget-links') {
                                    data = {
                                        items: [
                                            {page: 'home', name: 'Home'},
                                            {page: 'about', name: 'About'},
                                            {page: 'contact', name: 'Contact'}
                                        ]
                                    };
                                } else if (id === 'widget-info') {
                                    if (pageName === 'about') {
                                        data = {
                                            text: 'You\'re on <span class="highlight js-highlight">About</span> page.'
                                        };
                                    } else if (pageName === 'contact') {
                                        data = {
                                            text: 'You\'re on <span class="highlight js-highlight">Contact</span> page.'
                                        };
                                    }
                                }

                                that.res.set('Content-Type', 'application/json');
                                that.res.json(200, data);
                            }
                        }
                    };

                    routing.router = new router.http.Router(routes);

                    data.server.use(function routerMiddleware(req, res, next) {
                        routing.router.dispatch(req, res, function (err) {
                            if (err) {
                                page.render(_.extend({
                                    routeData: {
                                        pageName: 'not-found'
                                    }
                                }, getServerObject(this)));
                            }
                        });
                    });

                    if (cb && typeof cb === 'function') {
                        cb(data);
                    }
                }
            };

            if ('bus' in app) {
                app.bus.on(app.namespace + '::' + moduleName + '::init', function (data, cb) {
                    routing.init(data, cb);
                });
            }

            return routing;
        }
    };
})(module);
},{}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
(function widgetContentConfigure(module) {
    'use strict';

    module.exports = {
        configure: function (container) {
            container
                .define({
                    name: 'widgetContentController',
                    type: require('./js/controller.js').init,
                    category: 'controllers',
                    deps: ['app', 'window', '$', '_', 'ajax'],
                    singleton: true
                })
                .define({
                    name: 'widgetContentPresenter',
                    type: require('./js/presenter.js').init,
                    category: 'presenters',
                    deps: ['app', 'window', '$', '_', 'async', 'widgetContentStructure'],
                    singleton: true
                })
                .define({
                    name: 'widgetContentStructure',
                    type: require('./js/structure.js').init,
                    category: 'controllers',
                    deps: [],
                    singleton: true
                })
                .define({
                    name: 'widgetContentWireup',
                    type: require('./js/wireup.js').init,
                    category: 'wireups',
                    deps: ['app', 'window', '$', '_', 'async', 'widgetContentStructure'],
                    singleton: true
                });
        }
    };
})(module);
},{"./js/controller.js":13,"./js/presenter.js":14,"./js/structure.js":15,"./js/wireup.js":16}],13:[function(require,module,exports){
(function widgetContentControllerInit(module) {
    'use strict';

    var moduleName = 'widget-content';

    module.exports = {
        init: function (app, window, $, _, ajax, undefined) {
            var controller = {
                get: function (data, cb) {
                    ajax.get({
                        url: '/api/terms',
                        data: data
                    }, function (err, response) {
                        if (cb && typeof cb === 'function') {
                            cb(err, response);
                        }
                    });
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::get', function (data, cb) {
                    controller.get(data, cb);
                });
            }

            return controller;
        }
    };
})(module);
},{}],14:[function(require,module,exports){
(function widgetContentPresenterInit(module) {
    'use strict';

    var moduleName = 'widget-content';

    module.exports = {
        init: function (app, window, $, _, async, structure, undefined) {
            var presenter = {
                render: function (data, cb) {
                    app.bus.emit(app.namespace + '::' + moduleName + '::get', data, function (err, response) {
                        var createAsyncCall = function (features) {
                            return _.reduce(features, function (memo, feature) {
                                memo[feature.id] = function (cb) {
                                    app.bus.emit(app.namespace + '::' + feature.id + '::render', data, cb);
                                };
                                return memo;
                            }, {});
                        };

                        var asyncCallback = function (err, asyncData) {
                            var template = app.templates[moduleName + '/' + data.pageName];
                            var html = template ? template.render(_.extend(response, asyncData)) : '';

                            app.bus.emit(app.namespace + '::' + moduleName + '::loaded', html);

                            if (cb && typeof cb === 'function') {
                                cb(null, html);
                            }
                        };

                        if (structure[data.pageName]) {
                            async.parallel(createAsyncCall(structure[data.pageName]), asyncCallback);
                        } else {
                            asyncCallback(null, {});
                        }
                    });
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::render', function (data, cb) {
                    presenter.render(_.extend(data, {id: moduleName}), cb);
                });
            }

            return presenter;
        }
    };
})(module);
},{}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
(function widgetContentWireupInit(module) {
    'use strict';

    var moduleName = 'widget-content';
    var animationTimeout = 250;

    module.exports = {
        init: function (app, window, $, _, async, structure, undefined) {
            var wireup = function (data, cb) {
                var createAsyncCall = function (features) {
                    return _.reduce(features, function (memo, feature) {
                        memo[feature.id] = function (cb) {
                            app.bus.emit(app.namespace + '::' + feature.id + '::wireup',
                                _.extend({}, data, {container: data.container.find(feature.container)}),
                                cb);
                        };
                        return memo;
                    }, {});
                };

                var asyncCallback = function (err, asyncData) {
                    if (cb && typeof cb === 'function') {
                        cb(null, data);
                    }
                };

                if (structure[data.pageName]) {
                    async.parallel(createAsyncCall(structure[data.pageName]), asyncCallback);
                } else {
                    asyncCallback(null, data);
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::wireup', function (data, cb) {
                    wireup(data, cb);
                });
            }

            return wireup;
        }
    };
})(module);
},{}],17:[function(require,module,exports){
(function widgetFooterConfigure(module) {
    'use strict';

    module.exports = {
        configure: function (container) {
            container
                .define({
                    name: 'widgetFooterController',
                    type: require('./js/controller.js').init,
                    category: 'controllers',
                    deps: ['app', 'window', '$', '_', 'ajax'],
                    singleton: true
                })
                .define({
                    name: 'widgetFooterPresenter',
                    type: require('./js/presenter.js').init,
                    category: 'presenters',
                    deps: ['app', 'window', '$', '_'],
                    singleton: true
                })
                .define({
                    name: 'widgetFooterWireup',
                    type: require('./js/wireup.js').init,
                    category: 'wireups',
                    deps: ['app', 'window', '$', '_'],
                    singleton: true
                });
        }
    };
})(module);
},{"./js/controller.js":18,"./js/presenter.js":19,"./js/wireup.js":20}],18:[function(require,module,exports){
(function widgetFooterControllerInit(module) {
    'use strict';

    var moduleName = 'widget-footer';

    module.exports = {
        init: function (app, window, $, _, ajax, undefined) {
            var controller = {
                get: function (data, cb) {
                    ajax.get({
                        url: '/api/terms',
                        data: data
                    }, function (err, response) {
                        if (cb && typeof cb === 'function') {
                            cb(err, response);
                        }
                    });
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::get', function (data, cb) {
                    controller.get(data, cb);
                });
            }

            return controller;
        }
    };
})(module);
},{}],19:[function(require,module,exports){
(function widgetFooterPresenterInit(module) {
    'use strict';

    var moduleName = 'widget-footer';

    module.exports = {
        init: function (app, window, $, _, undefined) {
            var presenter = {
                render: function (data, cb) {
                    app.bus.emit(app.namespace + '::' + moduleName + '::get', data, function (err, response) {
                        var html = app.templates[moduleName + '/main'].render(response);

                        app.bus.emit(app.namespace + '::' + moduleName + '::loaded', html);

                        if (cb && typeof cb === 'function') {
                            cb(null, html);
                        }
                    });
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::render', function (data, cb) {
                    presenter.render(_.extend(data, {id: moduleName}), cb);
                });
            }

            return presenter;
        }
    };
})(module);
},{}],20:[function(require,module,exports){
(function widgetFooterWireupInit(module) {
    'use strict';

    var moduleName = 'widget-footer';
    var animationTimeout = 250;

    module.exports = {
        init: function (app, window, $, _, undefined) {
            var wireup = function (data, cb) {
                if (cb && typeof cb === 'function') {
                    cb(null, data);
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::wireup', function (data, cb) {
                    wireup(data, cb);
                });
            }

            return wireup;
        }
    };
})(module);
},{}],21:[function(require,module,exports){
(function widgetHeaderConfigure(module) {
    'use strict';

    module.exports = {
        configure: function (container) {
            container
                .define({
                    name: 'widgetHeaderController',
                    type: require('./js/controller.js').init,
                    category: 'controllers',
                    deps: ['app', 'window', '$', '_', 'ajax'],
                    singleton: true
                })
                .define({
                    name: 'widgetHeaderPresenter',
                    type: require('./js/presenter.js').init,
                    category: 'presenters',
                    deps: ['app', 'window', '$', '_'],
                    singleton: true
                })
                .define({
                    name: 'widgetHeaderWireup',
                    type: require('./js/wireup.js').init,
                    category: 'wireups',
                    deps: ['app', 'window', '$', '_'],
                    singleton: true
                });
        }
    };
})(module);
},{"./js/controller.js":22,"./js/presenter.js":23,"./js/wireup.js":24}],22:[function(require,module,exports){
(function widgetHeaderControllerInit(module) {
    'use strict';

    var moduleName = 'widget-header';

    module.exports = {
        init: function (app, window, $, _, ajax, undefined) {
            var controller = {
                get: function (data, cb) {
                    ajax.get({
                        url: '/api/terms',
                        data: data
                    }, function (err, response) {
                        if (cb && typeof cb === 'function') {
                            cb(err, response);
                        }
                    });
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::get', function (data, cb) {
                    controller.get(data, cb);
                });
            }

            return controller;
        }
    };
})(module);
},{}],23:[function(require,module,exports){
(function widgetHeaderPresenterInit(module) {
    'use strict';

    var moduleName = 'widget-header';

    module.exports = {
        init: function (app, window, $, _, undefined) {
            var presenter = {
                render: function (data, cb) {
                    app.bus.emit(app.namespace + '::' + moduleName + '::get', data, function (err, response) {
                        var html = app.templates[moduleName + '/main'].render(response);

                        app.bus.emit(app.namespace + '::' + moduleName + '::loaded', html);

                        if (cb && typeof cb === 'function') {
                            cb(null, html);
                        }
                    });
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::render', function (data, cb) {
                    presenter.render(_.extend(data, {id: moduleName}), cb);
                });
            }

            return presenter;
        }
    };
})(module);
},{}],24:[function(require,module,exports){
(function widgetHeaderWireupInit(module) {
    'use strict';

    var moduleName = 'widget-header';
    var animationTimeout = 250;

    module.exports = {
        init: function (app, window, $, _, undefined) {
            var wireup = function (data, cb) {
                if (cb && typeof cb === 'function') {
                    cb(null, data);
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::wireup', function (data, cb) {
                    wireup(data, cb);
                });
            }

            return wireup;
        }
    };
})(module);
},{}],25:[function(require,module,exports){
(function widgetInfoConfigure(module) {
    'use strict';

    module.exports = {
        configure: function (container) {
            container
                .define({
                    name: 'widgetInfoController',
                    type: require('./js/controller.js').init,
                    category: 'controllers',
                    deps: ['app', 'window', '$', '_', 'ajax'],
                    singleton: true
                })
                .define({
                    name: 'widgetInfoPresenter',
                    type: require('./js/presenter.js').init,
                    category: 'presenters',
                    deps: ['app', 'window', '$', '_'],
                    singleton: true
                })
                .define({
                    name: 'widgetInfoWireup',
                    type: require('./js/wireup.js').init,
                    category: 'wireups',
                    deps: ['app', 'window', '$', '_'],
                    singleton: true
                });
        }
    };
})(module);
},{"./js/controller.js":26,"./js/presenter.js":27,"./js/wireup.js":28}],26:[function(require,module,exports){
(function widgetInfoControllerInit(module) {
    'use strict';

    var moduleName = 'widget-info';

    module.exports = {
        init: function (app, window, $, _, ajax, undefined) {
            var controller = {
                get: function (data, cb) {
                    ajax.get({
                        url: '/api/terms',
                        data: data
                    }, function (err, response) {
                        if (cb && typeof cb === 'function') {
                            cb(err, response);
                        }
                    });
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::get', function (data, cb) {
                    controller.get(data, cb);
                });
            }

            return controller;
        }
    };
})(module);
},{}],27:[function(require,module,exports){
(function widgetInfoPresenterInit(module) {
    'use strict';

    var moduleName = 'widget-info';

    module.exports = {
        init: function (app, window, $, _, undefined) {
            var presenter = {
                render: function (data, cb) {
                    app.bus.emit(app.namespace + '::' + moduleName + '::get', {
                        id: data.id,
                        pageName: data.pageName
                    }, function (errGet, dataGet) {
                        var html = app.templates[moduleName + '/main'].render(_.extend({}, data, dataGet));

                        app.bus.emit(app.namespace + '::' + moduleName + '::loaded', html);

                        if (cb && typeof cb === 'function') {
                            cb(null, html);
                        }
                    });
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::render', function (data, cb) {
                    presenter.render(_.extend(data, {id: moduleName}), cb);
                });
            }

            return presenter;
        }
    };
})(module);
},{}],28:[function(require,module,exports){
(function widgetInfoWireupInit(module) {
    'use strict';

    var moduleName = 'widget-info';
    var animationTimeout = 250;

    module.exports = {
        init: function (app, window, $, _, undefined) {
            var wireup = function (data, cb) {
                var container = data.container;

                container
                    .off('click.' + moduleName, '.js-highlight')
                    .on('click.' + moduleName, '.js-highlight', function (event) {
                        var span = $(event.currentTarget).toggleClass('clicked');
                        return true;
                    });

                if (cb && typeof cb === 'function') {
                    cb(null, data);
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::wireup', function (data, cb) {
                    wireup(data, cb);
                });
            }

            return wireup;
        }
    };
})(module);
},{}],29:[function(require,module,exports){
(function widgetLinksConfigure(module) {
    'use strict';

    module.exports = {
        configure: function (container) {
            container
                .define({
                    name: 'widgetLinksController',
                    type: require('./js/controller.js').init,
                    category: 'controllers',
                    deps: ['app', 'window', '$', '_', 'ajax'],
                    singleton: true
                })
                .define({
                    name: 'widgetLinksPresenter',
                    type: require('./js/presenter.js').init,
                    category: 'presenters',
                    deps: ['app', 'window', '$', '_'],
                    singleton: true
                })
                .define({
                    name: 'widgetLinksWireup',
                    type: require('./js/wireup.js').init,
                    category: 'wireups',
                    deps: ['app', 'window', '$', '_'],
                    singleton: true
                });
        }
    };
})(module);
},{"./js/controller.js":30,"./js/presenter.js":31,"./js/wireup.js":32}],30:[function(require,module,exports){
(function widgetLinksControllerInit(module) {
    'use strict';

    var moduleName = 'widget-links';

    module.exports = {
        init: function (app, window, $, _, ajax, undefined) {
            var controller = {
                get: function (data, cb) {
                    ajax.get({
                        url: '/api/terms',
                        data: data
                    }, function (err, response) {
                        if (cb && typeof cb === 'function') {
                            cb(err, response);
                        }
                    });
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::get', function (data, cb) {
                    controller.get(data, cb);
                });
            }

            return controller;
        }
    };
})(module);
},{}],31:[function(require,module,exports){
(function widgetLinksPresenterInit(module) {
    'use strict';

    var moduleName = 'widget-links';

    module.exports = {
        init: function (app, window, $, _, undefined) {
            var presenter = {
                render: function (data, cb) {
                    app.bus.emit(app.namespace + '::' + moduleName + '::get', {id: data.id}, function (errGet, dataGet) {
                        var html = app.templates[moduleName + '/main'].render(_.extend({}, data, dataGet));

                        app.bus.emit(app.namespace + '::' + moduleName + '::loaded', html);

                        if (cb && typeof cb === 'function') {
                            cb(null, html);
                        }
                    });
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::render', function (data, cb) {
                    presenter.render(_.extend(data, {id: moduleName}), cb);
                });
            }

            return presenter;
        }
    };
})(module);
},{}],32:[function(require,module,exports){
(function widgetLinksWireupInit(module) {
    'use strict';

    var moduleName = 'widget-links';
    var animationTimeout = 250;

    module.exports = {
        init: function (app, window, $, _, undefined) {
            var wireup = function (data, cb) {
                var container = data.container;

                if (cb && typeof cb === 'function') {
                    cb(null, data);
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::wireup', function (data, cb) {
                    wireup(data, cb);
                });
            }

            return wireup;
        }
    };
})(module);
},{}],33:[function(require,module,exports){
(function widgetSocialConfigure(module) {
    'use strict';

    module.exports = {
        configure: function (container) {
            container
                .define({
                    name: 'widgetSocialController',
                    type: require('./js/controller.js').init,
                    category: 'controllers',
                    deps: ['app', 'window', '$', '_', 'ajax'],
                    singleton: true
                })
                .define({
                    name: 'widgetSocialPresenter',
                    type: require('./js/presenter.js').init,
                    category: 'presenters',
                    deps: ['app', 'window', '$', '_'],
                    singleton: true
                })
                .define({
                    name: 'widgetSocialWireup',
                    type: require('./js/wireup.js').init,
                    category: 'wireups',
                    deps: ['app', 'window', '$', '_'],
                    singleton: true
                });
        }
    };
})(module);
},{"./js/controller.js":34,"./js/presenter.js":35,"./js/wireup.js":36}],34:[function(require,module,exports){
(function widgetSocialControllerInit(module) {
    'use strict';

    var moduleName = 'widget-social';

    module.exports = {
        init: function (app, window, $, _, ajax, undefined) {
            var controller = {
                get: function (data, cb) {
                    ajax.get({
                        url: '/api/terms',
                        data: data
                    }, function (err, response) {
                        if (cb && typeof cb === 'function') {
                            cb(err, response);
                        }
                    });
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::get', function (data, cb) {
                    controller.get(data, cb);
                });
            }

            return controller;
        }
    };
})(module);
},{}],35:[function(require,module,exports){
(function widgetSocialPresenterInit(module) {
    'use strict';

    var moduleName = 'widget-social';

    module.exports = {
        init: function (app, window, $, _, undefined) {
            var presenter = {
                render: function (data, cb) {
                    app.bus.emit(app.namespace + '::' + moduleName + '::get', {id: data.id}, function (errGet, dataGet) {
                        var html = app.templates[moduleName + '/main'].render(_.extend({}, data, dataGet));

                        app.bus.emit(app.namespace + '::' + moduleName + '::loaded', html);

                        if (cb && typeof cb === 'function') {
                            cb(null, html);
                        }
                    });
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::render', function (data, cb) {
                    presenter.render(_.extend(data, {id: moduleName}), cb);
                });
            }

            return presenter;
        }
    };
})(module);
},{}],36:[function(require,module,exports){
(function widgetSocialWireupInit(module) {
    'use strict';

    var moduleName = 'widget-social';
    var animationTimeout = 250;

    module.exports = {
        init: function (app, window, $, _, undefined) {
            var wireup = function (data, cb) {
                var container = data.container;

                if (cb && typeof cb === 'function') {
                    cb(null, data);
                }
            };

            if (app.bus) {
                app.bus.on(app.namespace + '::' + moduleName + '::wireup', function (data, cb) {
                    wireup(data, cb);
                });
            }

            return wireup;
        }
    };
})(module);
},{}],37:[function(require,module,exports){
var process=require("__browserify_process");/*global setImmediate: false, setTimeout: false, console: false */
(function () {

    var async = {};

    // global on the server, window in the browser
    var root, previous_async;

    root = this;
    if (root != null) {
      previous_async = root.async;
    }

    async.noConflict = function () {
        root.async = previous_async;
        return async;
    };

    function only_once(fn) {
        var called = false;
        return function() {
            if (called) throw new Error("Callback was already called.");
            called = true;
            fn.apply(root, arguments);
        }
    }

    //// cross-browser compatiblity functions ////

    var _each = function (arr, iterator) {
        if (arr.forEach) {
            return arr.forEach(iterator);
        }
        for (var i = 0; i < arr.length; i += 1) {
            iterator(arr[i], i, arr);
        }
    };

    var _map = function (arr, iterator) {
        if (arr.map) {
            return arr.map(iterator);
        }
        var results = [];
        _each(arr, function (x, i, a) {
            results.push(iterator(x, i, a));
        });
        return results;
    };

    var _reduce = function (arr, iterator, memo) {
        if (arr.reduce) {
            return arr.reduce(iterator, memo);
        }
        _each(arr, function (x, i, a) {
            memo = iterator(memo, x, i, a);
        });
        return memo;
    };

    var _keys = function (obj) {
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    //// exported async module functions ////

    //// nextTick implementation with browser-compatible fallback ////
    if (typeof process === 'undefined' || !(process.nextTick)) {
        if (typeof setImmediate === 'function') {
            async.nextTick = function (fn) {
                // not a direct alias for IE10 compatibility
                setImmediate(fn);
            };
            async.setImmediate = async.nextTick;
        }
        else {
            async.nextTick = function (fn) {
                setTimeout(fn, 0);
            };
            async.setImmediate = async.nextTick;
        }
    }
    else {
        async.nextTick = process.nextTick;
        if (typeof setImmediate !== 'undefined') {
            async.setImmediate = setImmediate;
        }
        else {
            async.setImmediate = async.nextTick;
        }
    }

    async.each = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        _each(arr, function (x) {
            iterator(x, only_once(function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed >= arr.length) {
                        callback(null);
                    }
                }
            }));
        });
    };
    async.forEach = async.each;

    async.eachSeries = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        var iterate = function () {
            iterator(arr[completed], function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed >= arr.length) {
                        callback(null);
                    }
                    else {
                        iterate();
                    }
                }
            });
        };
        iterate();
    };
    async.forEachSeries = async.eachSeries;

    async.eachLimit = function (arr, limit, iterator, callback) {
        var fn = _eachLimit(limit);
        fn.apply(null, [arr, iterator, callback]);
    };
    async.forEachLimit = async.eachLimit;

    var _eachLimit = function (limit) {

        return function (arr, iterator, callback) {
            callback = callback || function () {};
            if (!arr.length || limit <= 0) {
                return callback();
            }
            var completed = 0;
            var started = 0;
            var running = 0;

            (function replenish () {
                if (completed >= arr.length) {
                    return callback();
                }

                while (running < limit && started < arr.length) {
                    started += 1;
                    running += 1;
                    iterator(arr[started - 1], function (err) {
                        if (err) {
                            callback(err);
                            callback = function () {};
                        }
                        else {
                            completed += 1;
                            running -= 1;
                            if (completed >= arr.length) {
                                callback();
                            }
                            else {
                                replenish();
                            }
                        }
                    });
                }
            })();
        };
    };


    var doParallel = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.each].concat(args));
        };
    };
    var doParallelLimit = function(limit, fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [_eachLimit(limit)].concat(args));
        };
    };
    var doSeries = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.eachSeries].concat(args));
        };
    };


    var _asyncMap = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (err, v) {
                results[x.index] = v;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    };
    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);
    async.mapLimit = function (arr, limit, iterator, callback) {
        return _mapLimit(limit)(arr, iterator, callback);
    };

    var _mapLimit = function(limit) {
        return doParallelLimit(limit, _asyncMap);
    };

    // reduce only has a series version, as doing reduce in parallel won't
    // work in many situations.
    async.reduce = function (arr, memo, iterator, callback) {
        async.eachSeries(arr, function (x, callback) {
            iterator(memo, x, function (err, v) {
                memo = v;
                callback(err);
            });
        }, function (err) {
            callback(err, memo);
        });
    };
    // inject alias
    async.inject = async.reduce;
    // foldl alias
    async.foldl = async.reduce;

    async.reduceRight = function (arr, memo, iterator, callback) {
        var reversed = _map(arr, function (x) {
            return x;
        }).reverse();
        async.reduce(reversed, memo, iterator, callback);
    };
    // foldr alias
    async.foldr = async.reduceRight;

    var _filter = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.filter = doParallel(_filter);
    async.filterSeries = doSeries(_filter);
    // select alias
    async.select = async.filter;
    async.selectSeries = async.filterSeries;

    var _reject = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (!v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.reject = doParallel(_reject);
    async.rejectSeries = doSeries(_reject);

    var _detect = function (eachfn, arr, iterator, main_callback) {
        eachfn(arr, function (x, callback) {
            iterator(x, function (result) {
                if (result) {
                    main_callback(x);
                    main_callback = function () {};
                }
                else {
                    callback();
                }
            });
        }, function (err) {
            main_callback();
        });
    };
    async.detect = doParallel(_detect);
    async.detectSeries = doSeries(_detect);

    async.some = function (arr, iterator, main_callback) {
        async.each(arr, function (x, callback) {
            iterator(x, function (v) {
                if (v) {
                    main_callback(true);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(false);
        });
    };
    // any alias
    async.any = async.some;

    async.every = function (arr, iterator, main_callback) {
        async.each(arr, function (x, callback) {
            iterator(x, function (v) {
                if (!v) {
                    main_callback(false);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(true);
        });
    };
    // all alias
    async.all = async.every;

    async.sortBy = function (arr, iterator, callback) {
        async.map(arr, function (x, callback) {
            iterator(x, function (err, criteria) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, {value: x, criteria: criteria});
                }
            });
        }, function (err, results) {
            if (err) {
                return callback(err);
            }
            else {
                var fn = function (left, right) {
                    var a = left.criteria, b = right.criteria;
                    return a < b ? -1 : a > b ? 1 : 0;
                };
                callback(null, _map(results.sort(fn), function (x) {
                    return x.value;
                }));
            }
        });
    };

    async.auto = function (tasks, callback) {
        callback = callback || function () {};
        var keys = _keys(tasks);
        if (!keys.length) {
            return callback(null);
        }

        var results = {};

        var listeners = [];
        var addListener = function (fn) {
            listeners.unshift(fn);
        };
        var removeListener = function (fn) {
            for (var i = 0; i < listeners.length; i += 1) {
                if (listeners[i] === fn) {
                    listeners.splice(i, 1);
                    return;
                }
            }
        };
        var taskComplete = function () {
            _each(listeners.slice(0), function (fn) {
                fn();
            });
        };

        addListener(function () {
            if (_keys(results).length === keys.length) {
                callback(null, results);
                callback = function () {};
            }
        });

        _each(keys, function (k) {
            var task = (tasks[k] instanceof Function) ? [tasks[k]]: tasks[k];
            var taskCallback = function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (args.length <= 1) {
                    args = args[0];
                }
                if (err) {
                    var safeResults = {};
                    _each(_keys(results), function(rkey) {
                        safeResults[rkey] = results[rkey];
                    });
                    safeResults[k] = args;
                    callback(err, safeResults);
                    // stop subsequent errors hitting callback multiple times
                    callback = function () {};
                }
                else {
                    results[k] = args;
                    async.setImmediate(taskComplete);
                }
            };
            var requires = task.slice(0, Math.abs(task.length - 1)) || [];
            var ready = function () {
                return _reduce(requires, function (a, x) {
                    return (a && results.hasOwnProperty(x));
                }, true) && !results.hasOwnProperty(k);
            };
            if (ready()) {
                task[task.length - 1](taskCallback, results);
            }
            else {
                var listener = function () {
                    if (ready()) {
                        removeListener(listener);
                        task[task.length - 1](taskCallback, results);
                    }
                };
                addListener(listener);
            }
        });
    };

    async.waterfall = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor !== Array) {
          var err = new Error('First argument to waterfall must be an array of functions');
          return callback(err);
        }
        if (!tasks.length) {
            return callback();
        }
        var wrapIterator = function (iterator) {
            return function (err) {
                if (err) {
                    callback.apply(null, arguments);
                    callback = function () {};
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    var next = iterator.next();
                    if (next) {
                        args.push(wrapIterator(next));
                    }
                    else {
                        args.push(callback);
                    }
                    async.setImmediate(function () {
                        iterator.apply(null, args);
                    });
                }
            };
        };
        wrapIterator(async.iterator(tasks))();
    };

    var _parallel = function(eachfn, tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            eachfn.map(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            eachfn.each(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.parallel = function (tasks, callback) {
        _parallel({ map: async.map, each: async.each }, tasks, callback);
    };

    async.parallelLimit = function(tasks, limit, callback) {
        _parallel({ map: _mapLimit(limit), each: _eachLimit(limit) }, tasks, callback);
    };

    async.series = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            async.mapSeries(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            async.eachSeries(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.iterator = function (tasks) {
        var makeCallback = function (index) {
            var fn = function () {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            };
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
            };
            return fn;
        };
        return makeCallback(0);
    };

    async.apply = function (fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            return fn.apply(
                null, args.concat(Array.prototype.slice.call(arguments))
            );
        };
    };

    var _concat = function (eachfn, arr, fn, callback) {
        var r = [];
        eachfn(arr, function (x, cb) {
            fn(x, function (err, y) {
                r = r.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, r);
        });
    };
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);

    async.whilst = function (test, iterator, callback) {
        if (test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.whilst(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.doWhilst = function (iterator, test, callback) {
        iterator(function (err) {
            if (err) {
                return callback(err);
            }
            if (test()) {
                async.doWhilst(iterator, test, callback);
            }
            else {
                callback();
            }
        });
    };

    async.until = function (test, iterator, callback) {
        if (!test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.until(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.doUntil = function (iterator, test, callback) {
        iterator(function (err) {
            if (err) {
                return callback(err);
            }
            if (!test()) {
                async.doUntil(iterator, test, callback);
            }
            else {
                callback();
            }
        });
    };

    async.queue = function (worker, concurrency) {
        if (concurrency === undefined) {
            concurrency = 1;
        }
        function _insert(q, data, pos, callback) {
          if(data.constructor !== Array) {
              data = [data];
          }
          _each(data, function(task) {
              var item = {
                  data: task,
                  callback: typeof callback === 'function' ? callback : null
              };

              if (pos) {
                q.tasks.unshift(item);
              } else {
                q.tasks.push(item);
              }

              if (q.saturated && q.tasks.length === concurrency) {
                  q.saturated();
              }
              async.setImmediate(q.process);
          });
        }

        var workers = 0;
        var q = {
            tasks: [],
            concurrency: concurrency,
            saturated: null,
            empty: null,
            drain: null,
            push: function (data, callback) {
              _insert(q, data, false, callback);
            },
            unshift: function (data, callback) {
              _insert(q, data, true, callback);
            },
            process: function () {
                if (workers < q.concurrency && q.tasks.length) {
                    var task = q.tasks.shift();
                    if (q.empty && q.tasks.length === 0) {
                        q.empty();
                    }
                    workers += 1;
                    var next = function () {
                        workers -= 1;
                        if (task.callback) {
                            task.callback.apply(task, arguments);
                        }
                        if (q.drain && q.tasks.length + workers === 0) {
                            q.drain();
                        }
                        q.process();
                    };
                    var cb = only_once(next);
                    worker(task.data, cb);
                }
            },
            length: function () {
                return q.tasks.length;
            },
            running: function () {
                return workers;
            }
        };
        return q;
    };

    async.cargo = function (worker, payload) {
        var working     = false,
            tasks       = [];

        var cargo = {
            tasks: tasks,
            payload: payload,
            saturated: null,
            empty: null,
            drain: null,
            push: function (data, callback) {
                if(data.constructor !== Array) {
                    data = [data];
                }
                _each(data, function(task) {
                    tasks.push({
                        data: task,
                        callback: typeof callback === 'function' ? callback : null
                    });
                    if (cargo.saturated && tasks.length === payload) {
                        cargo.saturated();
                    }
                });
                async.setImmediate(cargo.process);
            },
            process: function process() {
                if (working) return;
                if (tasks.length === 0) {
                    if(cargo.drain) cargo.drain();
                    return;
                }

                var ts = typeof payload === 'number'
                            ? tasks.splice(0, payload)
                            : tasks.splice(0);

                var ds = _map(ts, function (task) {
                    return task.data;
                });

                if(cargo.empty) cargo.empty();
                working = true;
                worker(ds, function () {
                    working = false;

                    var args = arguments;
                    _each(ts, function (data) {
                        if (data.callback) {
                            data.callback.apply(null, args);
                        }
                    });

                    process();
                });
            },
            length: function () {
                return tasks.length;
            },
            running: function () {
                return working;
            }
        };
        return cargo;
    };

    var _console_fn = function (name) {
        return function (fn) {
            var args = Array.prototype.slice.call(arguments, 1);
            fn.apply(null, args.concat([function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (typeof console !== 'undefined') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    }
                    else if (console[name]) {
                        _each(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            }]));
        };
    };
    async.log = _console_fn('log');
    async.dir = _console_fn('dir');
    /*async.info = _console_fn('info');
    async.warn = _console_fn('warn');
    async.error = _console_fn('error');*/

    async.memoize = function (fn, hasher) {
        var memo = {};
        var queues = {};
        hasher = hasher || function (x) {
            return x;
        };
        var memoized = function () {
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (key in memo) {
                callback.apply(null, memo[key]);
            }
            else if (key in queues) {
                queues[key].push(callback);
            }
            else {
                queues[key] = [callback];
                fn.apply(null, args.concat([function () {
                    memo[key] = arguments;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                      q[i].apply(null, arguments);
                    }
                }]));
            }
        };
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
    };

    async.unmemoize = function (fn) {
      return function () {
        return (fn.unmemoized || fn).apply(null, arguments);
      };
    };

    async.times = function (count, iterator, callback) {
        var counter = [];
        for (var i = 0; i < count; i++) {
            counter.push(i);
        }
        return async.map(counter, iterator, callback);
    };

    async.timesSeries = function (count, iterator, callback) {
        var counter = [];
        for (var i = 0; i < count; i++) {
            counter.push(i);
        }
        return async.mapSeries(counter, iterator, callback);
    };

    async.compose = function (/* functions... */) {
        var fns = Array.prototype.reverse.call(arguments);
        return function () {
            var that = this;
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            async.reduce(fns, args, function (newargs, fn, cb) {
                fn.apply(that, newargs.concat([function () {
                    var err = arguments[0];
                    var nextargs = Array.prototype.slice.call(arguments, 1);
                    cb(err, nextargs);
                }]))
            },
            function (err, results) {
                callback.apply(that, [err].concat(results));
            });
        };
    };

    var _applyEach = function (eachfn, fns /*args...*/) {
        var go = function () {
            var that = this;
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            return eachfn(fns, function (fn, cb) {
                fn.apply(that, args.concat([cb]));
            },
            callback);
        };
        if (arguments.length > 2) {
            var args = Array.prototype.slice.call(arguments, 2);
            return go.apply(this, args);
        }
        else {
            return go;
        }
    };
    async.applyEach = doParallel(_applyEach);
    async.applyEachSeries = doSeries(_applyEach);

    async.forever = function (fn, callback) {
        function next(err) {
            if (err) {
                if (callback) {
                    return callback(err);
                }
                throw err;
            }
            fn(next);
        }
        next();
    };

    // AMD / RequireJS
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return async;
        });
    }
    // Node.js
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = async;
    }
    // included directly via <script> tag
    else {
        root.async = async;
    }

}());

},{"__browserify_process":40}],38:[function(require,module,exports){


//
// Generated on Fri Dec 27 2013 12:02:11 GMT-0500 (EST) by Nodejitsu, Inc (Using Codesurgeon).
// Version 1.2.2
//

(function (exports) {

/*
 * browser.js: Browser specific functionality for director.
 *
 * (C) 2011, Nodejitsu Inc.
 * MIT LICENSE
 *
 */

if (!Array.prototype.filter) {
  Array.prototype.filter = function(filter, that) {
    var other = [], v;
    for (var i = 0, n = this.length; i < n; i++) {
      if (i in this && filter.call(that, v = this[i], i, this)) {
        other.push(v);
      }
    }
    return other;
  };
}

if (!Array.isArray){
  Array.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
}

var dloc = document.location;

function dlocHashEmpty() {
  // Non-IE browsers return '' when the address bar shows '#'; Director's logic
  // assumes both mean empty.
  return dloc.hash === '' || dloc.hash === '#';
}

var listener = {
  mode: 'modern',
  hash: dloc.hash,
  history: false,

  check: function () {
    var h = dloc.hash;
    if (h != this.hash) {
      this.hash = h;
      this.onHashChanged();
    }
  },

  fire: function () {
    if (this.mode === 'modern') {
      this.history === true ? window.onpopstate() : window.onhashchange();
    }
    else {
      this.onHashChanged();
    }
  },

  init: function (fn, history) {
    var self = this;
    this.history = history;

    if (!Router.listeners) {
      Router.listeners = [];
    }

    function onchange(onChangeEvent) {
      for (var i = 0, l = Router.listeners.length; i < l; i++) {
        Router.listeners[i](onChangeEvent);
      }
    }

    //note IE8 is being counted as 'modern' because it has the hashchange event
    if ('onhashchange' in window && (document.documentMode === undefined
      || document.documentMode > 7)) {
      // At least for now HTML5 history is available for 'modern' browsers only
      if (this.history === true) {
        // There is an old bug in Chrome that causes onpopstate to fire even
        // upon initial page load. Since the handler is run manually in init(),
        // this would cause Chrome to run it twise. Currently the only
        // workaround seems to be to set the handler after the initial page load
        // http://code.google.com/p/chromium/issues/detail?id=63040
        setTimeout(function() {
          window.onpopstate = onchange;
        }, 500);
      }
      else {
        window.onhashchange = onchange;
      }
      this.mode = 'modern';
    }
    else {
      //
      // IE support, based on a concept by Erik Arvidson ...
      //
      var frame = document.createElement('iframe');
      frame.id = 'state-frame';
      frame.style.display = 'none';
      document.body.appendChild(frame);
      this.writeFrame('');

      if ('onpropertychange' in document && 'attachEvent' in document) {
        document.attachEvent('onpropertychange', function () {
          if (event.propertyName === 'location') {
            self.check();
          }
        });
      }

      window.setInterval(function () { self.check(); }, 50);

      this.onHashChanged = onchange;
      this.mode = 'legacy';
    }

    Router.listeners.push(fn);

    return this.mode;
  },

  destroy: function (fn) {
    if (!Router || !Router.listeners) {
      return;
    }

    var listeners = Router.listeners;

    for (var i = listeners.length - 1; i >= 0; i--) {
      if (listeners[i] === fn) {
        listeners.splice(i, 1);
      }
    }
  },

  setHash: function (s) {
    // Mozilla always adds an entry to the history
    if (this.mode === 'legacy') {
      this.writeFrame(s);
    }

    if (this.history === true) {
      window.history.pushState({}, document.title, s);
      // Fire an onpopstate event manually since pushing does not obviously
      // trigger the pop event.
      this.fire();
    } else {
      dloc.hash = (s[0] === '/') ? s : '/' + s;
    }
    return this;
  },

  writeFrame: function (s) {
    // IE support...
    var f = document.getElementById('state-frame');
    var d = f.contentDocument || f.contentWindow.document;
    d.open();
    d.write("<script>_hash = '" + s + "'; onload = parent.listener.syncHash;<script>");
    d.close();
  },

  syncHash: function () {
    // IE support...
    var s = this._hash;
    if (s != dloc.hash) {
      dloc.hash = s;
    }
    return this;
  },

  onHashChanged: function () {}
};

var Router = exports.Router = function (routes) {
  if (!(this instanceof Router)) return new Router(routes);

  this.params   = {};
  this.routes   = {};
  this.methods  = ['on', 'once', 'after', 'before'];
  this.scope    = [];
  this._methods = {};

  this._insert = this.insert;
  this.insert = this.insertEx;

  this.historySupport = (window.history != null ? window.history.pushState : null) != null

  this.configure();
  this.mount(routes || {});
};

Router.prototype.init = function (r) {
  var self = this;
  this.handler = function(onChangeEvent) {
    var newURL = onChangeEvent && onChangeEvent.newURL || window.location.hash;
    var url = self.history === true ? self.getPath() : newURL.replace(/.*#/, '');
    self.dispatch('on', url.charAt(0) === '/' ? url : '/' + url);
  };

  listener.init(this.handler, this.history);

  if (this.history === false) {
    if (dlocHashEmpty() && r) {
      dloc.hash = r;
    } else if (!dlocHashEmpty()) {
      self.dispatch('on', '/' + dloc.hash.replace(/^(#\/|#|\/)/, ''));
    }
  }
  else {
    var routeTo = dlocHashEmpty() && r ? r : !dlocHashEmpty() ? dloc.hash.replace(/^#/, '') : null;
    if (routeTo) {
      window.history.replaceState({}, document.title, routeTo);
    }

    // Router has been initialized, but due to the chrome bug it will not
    // yet actually route HTML5 history state changes. Thus, decide if should route.
    if (routeTo || this.run_in_init === true) {
      this.handler();
    }
  }

  return this;
};

Router.prototype.explode = function () {
  var v = this.history === true ? this.getPath() : dloc.hash;
  if (v.charAt(1) === '/') { v=v.slice(1) }
  return v.slice(1, v.length).split("/");
};

Router.prototype.setRoute = function (i, v, val) {
  var url = this.explode();

  if (typeof i === 'number' && typeof v === 'string') {
    url[i] = v;
  }
  else if (typeof val === 'string') {
    url.splice(i, v, s);
  }
  else {
    url = [i];
  }

  listener.setHash(url.join('/'));
  return url;
};

//
// ### function insertEx(method, path, route, parent)
// #### @method {string} Method to insert the specific `route`.
// #### @path {Array} Parsed path to insert the `route` at.
// #### @route {Array|function} Route handlers to insert.
// #### @parent {Object} **Optional** Parent "routes" to insert into.
// insert a callback that will only occur once per the matched route.
//
Router.prototype.insertEx = function(method, path, route, parent) {
  if (method === "once") {
    method = "on";
    route = function(route) {
      var once = false;
      return function() {
        if (once) return;
        once = true;
        return route.apply(this, arguments);
      };
    }(route);
  }
  return this._insert(method, path, route, parent);
};

Router.prototype.getRoute = function (v) {
  var ret = v;

  if (typeof v === "number") {
    ret = this.explode()[v];
  }
  else if (typeof v === "string"){
    var h = this.explode();
    ret = h.indexOf(v);
  }
  else {
    ret = this.explode();
  }

  return ret;
};

Router.prototype.destroy = function () {
  listener.destroy(this.handler);
  return this;
};

Router.prototype.getPath = function () {
  var path = window.location.pathname;
  if (path.substr(0, 1) !== '/') {
    path = '/' + path;
  }
  return path;
};
function _every(arr, iterator) {
  for (var i = 0; i < arr.length; i += 1) {
    if (iterator(arr[i], i, arr) === false) {
      return;
    }
  }
}

function _flatten(arr) {
  var flat = [];
  for (var i = 0, n = arr.length; i < n; i++) {
    flat = flat.concat(arr[i]);
  }
  return flat;
}

function _asyncEverySeries(arr, iterator, callback) {
  if (!arr.length) {
    return callback();
  }
  var completed = 0;
  (function iterate() {
    iterator(arr[completed], function(err) {
      if (err || err === false) {
        callback(err);
        callback = function() {};
      } else {
        completed += 1;
        if (completed === arr.length) {
          callback();
        } else {
          iterate();
        }
      }
    });
  })();
}

function paramifyString(str, params, mod) {
  mod = str;
  for (var param in params) {
    if (params.hasOwnProperty(param)) {
      mod = params[param](str);
      if (mod !== str) {
        break;
      }
    }
  }
  return mod === str ? "([._a-zA-Z0-9-]+)" : mod;
}

function regifyString(str, params) {
  var matches, last = 0, out = "";
  while (matches = str.substr(last).match(/[^\w\d\- %@&]*\*[^\w\d\- %@&]*/)) {
    last = matches.index + matches[0].length;
    matches[0] = matches[0].replace(/^\*/, "([_.()!\\ %@&a-zA-Z0-9-]+)");
    out += str.substr(0, matches.index) + matches[0];
  }
  str = out += str.substr(last);
  var captures = str.match(/:([^\/]+)/ig), capture, length;
  if (captures) {
    length = captures.length;
    for (var i = 0; i < length; i++) {
      capture = captures[i];
      if (capture.slice(0, 2) === "::") {
        str = capture.slice(1);
      } else {
        str = str.replace(capture, paramifyString(capture, params));
      }
    }
  }
  return str;
}

function terminator(routes, delimiter, start, stop) {
  var last = 0, left = 0, right = 0, start = (start || "(").toString(), stop = (stop || ")").toString(), i;
  for (i = 0; i < routes.length; i++) {
    var chunk = routes[i];
    if (chunk.indexOf(start, last) > chunk.indexOf(stop, last) || ~chunk.indexOf(start, last) && !~chunk.indexOf(stop, last) || !~chunk.indexOf(start, last) && ~chunk.indexOf(stop, last)) {
      left = chunk.indexOf(start, last);
      right = chunk.indexOf(stop, last);
      if (~left && !~right || !~left && ~right) {
        var tmp = routes.slice(0, (i || 1) + 1).join(delimiter);
        routes = [ tmp ].concat(routes.slice((i || 1) + 1));
      }
      last = (right > left ? right : left) + 1;
      i = 0;
    } else {
      last = 0;
    }
  }
  return routes;
}

Router.prototype.configure = function(options) {
  options = options || {};
  for (var i = 0; i < this.methods.length; i++) {
    this._methods[this.methods[i]] = true;
  }
  this.recurse = options.recurse || this.recurse || false;
  this.async = options.async || false;
  this.delimiter = options.delimiter || "/";
  this.strict = typeof options.strict === "undefined" ? true : options.strict;
  this.notfound = options.notfound;
  this.resource = options.resource;
  this.history = options.html5history && this.historySupport || false;
  this.run_in_init = this.history === true && options.run_handler_in_init !== false;
  this.every = {
    after: options.after || null,
    before: options.before || null,
    on: options.on || null
  };
  return this;
};

Router.prototype.param = function(token, matcher) {
  if (token[0] !== ":") {
    token = ":" + token;
  }
  var compiled = new RegExp(token, "g");
  this.params[token] = function(str) {
    return str.replace(compiled, matcher.source || matcher);
  };
};

Router.prototype.on = Router.prototype.route = function(method, path, route) {
  var self = this;
  if (!route && typeof path == "function") {
    route = path;
    path = method;
    method = "on";
  }
  if (Array.isArray(path)) {
    return path.forEach(function(p) {
      self.on(method, p, route);
    });
  }
  if (path.source) {
    path = path.source.replace(/\\\//ig, "/");
  }
  if (Array.isArray(method)) {
    return method.forEach(function(m) {
      self.on(m.toLowerCase(), path, route);
    });
  }
  path = path.split(new RegExp(this.delimiter));
  path = terminator(path, this.delimiter);
  this.insert(method, this.scope.concat(path), route);
};

Router.prototype.dispatch = function(method, path, callback) {
  var self = this, fns = this.traverse(method, path, this.routes, ""), invoked = this._invoked, after;
  this._invoked = true;
  if (!fns || fns.length === 0) {
    this.last = [];
    if (typeof this.notfound === "function") {
      this.invoke([ this.notfound ], {
        method: method,
        path: path
      }, callback);
    }
    return false;
  }
  if (this.recurse === "forward") {
    fns = fns.reverse();
  }
  function updateAndInvoke() {
    self.last = fns.after;
    self.invoke(self.runlist(fns), self, callback);
  }
  after = this.every && this.every.after ? [ this.every.after ].concat(this.last) : [ this.last ];
  if (after && after.length > 0 && invoked) {
    if (this.async) {
      this.invoke(after, this, updateAndInvoke);
    } else {
      this.invoke(after, this);
      updateAndInvoke();
    }
    return true;
  }
  updateAndInvoke();
  return true;
};

Router.prototype.invoke = function(fns, thisArg, callback) {
  var self = this;
  var apply;
  if (this.async) {
    apply = function(fn, next) {
      if (Array.isArray(fn)) {
        return _asyncEverySeries(fn, apply, next);
      } else if (typeof fn == "function") {
        fn.apply(thisArg, fns.captures.concat(next));
      }
    };
    _asyncEverySeries(fns, apply, function() {
      if (callback) {
        callback.apply(thisArg, arguments);
      }
    });
  } else {
    apply = function(fn) {
      if (Array.isArray(fn)) {
        return _every(fn, apply);
      } else if (typeof fn === "function") {
        return fn.apply(thisArg, fns.captures || []);
      } else if (typeof fn === "string" && self.resource) {
        self.resource[fn].apply(thisArg, fns.captures || []);
      }
    };
    _every(fns, apply);
  }
};

Router.prototype.traverse = function(method, path, routes, regexp, filter) {
  var fns = [], current, exact, match, next, that;
  function filterRoutes(routes) {
    if (!filter) {
      return routes;
    }
    function deepCopy(source) {
      var result = [];
      for (var i = 0; i < source.length; i++) {
        result[i] = Array.isArray(source[i]) ? deepCopy(source[i]) : source[i];
      }
      return result;
    }
    function applyFilter(fns) {
      for (var i = fns.length - 1; i >= 0; i--) {
        if (Array.isArray(fns[i])) {
          applyFilter(fns[i]);
          if (fns[i].length === 0) {
            fns.splice(i, 1);
          }
        } else {
          if (!filter(fns[i])) {
            fns.splice(i, 1);
          }
        }
      }
    }
    var newRoutes = deepCopy(routes);
    newRoutes.matched = routes.matched;
    newRoutes.captures = routes.captures;
    newRoutes.after = routes.after.filter(filter);
    applyFilter(newRoutes);
    return newRoutes;
  }
  if (path === this.delimiter && routes[method]) {
    next = [ [ routes.before, routes[method] ].filter(Boolean) ];
    next.after = [ routes.after ].filter(Boolean);
    next.matched = true;
    next.captures = [];
    return filterRoutes(next);
  }
  for (var r in routes) {
    if (routes.hasOwnProperty(r) && (!this._methods[r] || this._methods[r] && typeof routes[r] === "object" && !Array.isArray(routes[r]))) {
      current = exact = regexp + this.delimiter + r;
      if (!this.strict) {
        exact += "[" + this.delimiter + "]?";
      }
      match = path.match(new RegExp("^" + exact));
      if (!match) {
        continue;
      }
      if (match[0] && match[0] == path && routes[r][method]) {
        next = [ [ routes[r].before, routes[r][method] ].filter(Boolean) ];
        next.after = [ routes[r].after ].filter(Boolean);
        next.matched = true;
        next.captures = match.slice(1);
        if (this.recurse && routes === this.routes) {
          next.push([ routes.before, routes.on ].filter(Boolean));
          next.after = next.after.concat([ routes.after ].filter(Boolean));
        }
        return filterRoutes(next);
      }
      next = this.traverse(method, path, routes[r], current);
      if (next.matched) {
        if (next.length > 0) {
          fns = fns.concat(next);
        }
        if (this.recurse) {
          fns.push([ routes[r].before, routes[r].on ].filter(Boolean));
          next.after = next.after.concat([ routes[r].after ].filter(Boolean));
          if (routes === this.routes) {
            fns.push([ routes["before"], routes["on"] ].filter(Boolean));
            next.after = next.after.concat([ routes["after"] ].filter(Boolean));
          }
        }
        fns.matched = true;
        fns.captures = next.captures;
        fns.after = next.after;
        return filterRoutes(fns);
      }
    }
  }
  return false;
};

Router.prototype.insert = function(method, path, route, parent) {
  var methodType, parentType, isArray, nested, part;
  path = path.filter(function(p) {
    return p && p.length > 0;
  });
  parent = parent || this.routes;
  part = path.shift();
  if (/\:|\*/.test(part) && !/\\d|\\w/.test(part)) {
    part = regifyString(part, this.params);
  }
  if (path.length > 0) {
    parent[part] = parent[part] || {};
    return this.insert(method, path, route, parent[part]);
  }
  if (!part && !path.length && parent === this.routes) {
    methodType = typeof parent[method];
    switch (methodType) {
     case "function":
      parent[method] = [ parent[method], route ];
      return;
     case "object":
      parent[method].push(route);
      return;
     case "undefined":
      parent[method] = route;
      return;
    }
    return;
  }
  parentType = typeof parent[part];
  isArray = Array.isArray(parent[part]);
  if (parent[part] && !isArray && parentType == "object") {
    methodType = typeof parent[part][method];
    switch (methodType) {
     case "function":
      parent[part][method] = [ parent[part][method], route ];
      return;
     case "object":
      parent[part][method].push(route);
      return;
     case "undefined":
      parent[part][method] = route;
      return;
    }
  } else if (parentType == "undefined") {
    nested = {};
    nested[method] = route;
    parent[part] = nested;
    return;
  }
  throw new Error("Invalid route context: " + parentType);
};



Router.prototype.extend = function(methods) {
  var self = this, len = methods.length, i;
  function extend(method) {
    self._methods[method] = true;
    self[method] = function() {
      var extra = arguments.length === 1 ? [ method, "" ] : [ method ];
      self.on.apply(self, extra.concat(Array.prototype.slice.call(arguments)));
    };
  }
  for (i = 0; i < len; i++) {
    extend(methods[i]);
  }
};

Router.prototype.runlist = function(fns) {
  var runlist = this.every && this.every.before ? [ this.every.before ].concat(_flatten(fns)) : _flatten(fns);
  if (this.every && this.every.on) {
    runlist.push(this.every.on);
  }
  runlist.captures = fns.captures;
  runlist.source = fns.source;
  return runlist;
};

Router.prototype.mount = function(routes, path) {
  if (!routes || typeof routes !== "object" || Array.isArray(routes)) {
    return;
  }
  var self = this;
  path = path || [];
  if (!Array.isArray(path)) {
    path = path.split(self.delimiter);
  }
  function insertOrMount(route, local) {
    var rename = route, parts = route.split(self.delimiter), routeType = typeof routes[route], isRoute = parts[0] === "" || !self._methods[parts[0]], event = isRoute ? "on" : rename;
    if (isRoute) {
      rename = rename.slice((rename.match(new RegExp("^" + self.delimiter)) || [ "" ])[0].length);
      parts.shift();
    }
    if (isRoute && routeType === "object" && !Array.isArray(routes[route])) {
      local = local.concat(parts);
      self.mount(routes[route], local);
      return;
    }
    if (isRoute) {
      local = local.concat(rename.split(self.delimiter));
      local = terminator(local, self.delimiter);
    }
    self.insert(event, local, routes[route]);
  }
  for (var route in routes) {
    if (routes.hasOwnProperty(route)) {
      insertOrMount(route, path.slice(0));
    }
  }
};



}(typeof exports === "object" ? exports : window));
},{}],39:[function(require,module,exports){
var process=require("__browserify_process");;!function(exports, undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {

      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      conf.maxListeners && (this._events.maxListeners = conf.maxListeners);
      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this.newListener = conf.newListener);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this.newListener = false;
    configure.call(this, conf);
  }

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }

    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else if(typeof tree._listeners === 'function') {
          tree._listeners = [tree._listeners, listener];
        }
        else if (isArray(tree._listeners)) {

          tree._listeners.push(listener);

          if (!tree._listeners.warned) {

            var m = defaultMaxListeners;

            if (typeof this._events.maxListeners !== 'undefined') {
              m = this._events.maxListeners;
            }

            if (m > 0 && tree._listeners.length > m) {

              tree._listeners.warned = true;
              console.error('(node) warning: possible EventEmitter memory ' +
                            'leak detected. %d listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit.',
                            tree._listeners.length);
              console.trace();
            }
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    this._events || init.call(this);
    this._events.maxListeners = n;
    if (!this._conf) this._conf = {};
    this._conf.maxListeners = n;
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function(event, fn) {
    this.many(event, 1, fn);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      fn.apply(this, arguments);
    }

    listener._origin = fn;

    this.on(event, listener);

    return self;
  };

  EventEmitter.prototype.emit = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) { return false; }
    }

    // Loop through the *_all* functions and invoke them.
    if (this._all) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        this._all[i].apply(this, args);
      }
    }

    // If there is no 'error' event listener then throw.
    if (type === 'error') {

      if (!this._all &&
        !this._events.error &&
        !(this.wildcard && this.listenerTree.error)) {

        if (arguments[1] instanceof Error) {
          throw arguments[1]; // Unhandled 'error' event
        } else {
          throw new Error("Uncaught, unspecified 'error' event.");
        }
        return false;
      }
    }

    var handler;

    if(this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    }
    else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      if (arguments.length === 1) {
        handler.call(this);
      }
      else if (arguments.length > 1)
        switch (arguments.length) {
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          // slower
          default:
            var l = arguments.length;
            var args = new Array(l - 1);
            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
            handler.apply(this, args);
        }
      return true;
    }
    else if (handler) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

      var listeners = handler.slice();
      for (var i = 0, l = listeners.length; i < l; i++) {
        this.event = type;
        listeners[i].apply(this, args);
      }
      return (listeners.length > 0) || this._all;
    }
    else {
      return this._all;
    }

  };

  EventEmitter.prototype.on = function(type, listener) {

    if (typeof type === 'function') {
      this.onAny(type);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if(this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else if(typeof this._events[type] === 'function') {
      // Adding the second element, need to change to array.
      this._events[type] = [this._events[type], listener];
    }
    else if (isArray(this._events[type])) {
      // If we've already got an array, just append.
      this._events[type].push(listener);

      // Check for listener leak
      if (!this._events[type].warned) {

        var m = defaultMaxListeners;

        if (typeof this._events.maxListeners !== 'undefined') {
          m = this._events.maxListeners;
        }

        if (m > 0 && this._events[type].length > m) {

          this._events[type].warned = true;
          console.error('(node) warning: possible EventEmitter memory ' +
                        'leak detected. %d listeners added. ' +
                        'Use emitter.setMaxListeners() to increase limit.',
                        this._events[type].length);
          console.trace();
        }
      }
    }
    return this;
  };

  EventEmitter.prototype.onAny = function(fn) {

    if(!this._all) {
      this._all = [];
    }

    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    // Add the function to the event listener collection.
    this._all.push(fn);
    return this;
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }
        return this;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }
      }
    }

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          return this;
        }
      }
    } else {
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (arguments.length === 0) {
      !this._events || init.call(this);
      return this;
    }

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else {
      if (!this._events[type]) return this;
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if(this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (typeof define === 'function' && define.amd) {
    define(function() {
      return EventEmitter;
    });
  } else {
    exports.EventEmitter2 = EventEmitter;
  }

}(typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof exports !== 'undefined' ? exports : window);

},{"__browserify_process":40}],40:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],41:[function(require,module,exports){
/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function (Hogan) {
  // Setup regex  assignments
  // remove whitespace according to Mustache spec
  var rIsWhitespace = /\S/,
      rQuot = /\"/g,
      rNewline =  /\n/g,
      rCr = /\r/g,
      rSlash = /\\/g,
      tagTypes = {
        '#': 1, '^': 2, '/': 3,  '!': 4, '>': 5,
        '<': 6, '=': 7, '_v': 8, '{': 9, '&': 10
      };

  Hogan.scan = function scan(text, delimiters) {
    var len = text.length,
        IN_TEXT = 0,
        IN_TAG_TYPE = 1,
        IN_TAG = 2,
        state = IN_TEXT,
        tagType = null,
        tag = null,
        buf = '',
        tokens = [],
        seenTag = false,
        i = 0,
        lineStart = 0,
        otag = '{{',
        ctag = '}}';

    function addBuf() {
      if (buf.length > 0) {
        tokens.push(new String(buf));
        buf = '';
      }
    }

    function lineIsWhitespace() {
      var isAllWhitespace = true;
      for (var j = lineStart; j < tokens.length; j++) {
        isAllWhitespace =
          (tokens[j].tag && tagTypes[tokens[j].tag] < tagTypes['_v']) ||
          (!tokens[j].tag && tokens[j].match(rIsWhitespace) === null);
        if (!isAllWhitespace) {
          return false;
        }
      }

      return isAllWhitespace;
    }

    function filterLine(haveSeenTag, noNewLine) {
      addBuf();

      if (haveSeenTag && lineIsWhitespace()) {
        for (var j = lineStart, next; j < tokens.length; j++) {
          if (!tokens[j].tag) {
            if ((next = tokens[j+1]) && next.tag == '>') {
              // set indent to token value
              next.indent = tokens[j].toString()
            }
            tokens.splice(j, 1);
          }
        }
      } else if (!noNewLine) {
        tokens.push({tag:'\n'});
      }

      seenTag = false;
      lineStart = tokens.length;
    }

    function changeDelimiters(text, index) {
      var close = '=' + ctag,
          closeIndex = text.indexOf(close, index),
          delimiters = trim(
            text.substring(text.indexOf('=', index) + 1, closeIndex)
          ).split(' ');

      otag = delimiters[0];
      ctag = delimiters[1];

      return closeIndex + close.length - 1;
    }

    if (delimiters) {
      delimiters = delimiters.split(' ');
      otag = delimiters[0];
      ctag = delimiters[1];
    }

    for (i = 0; i < len; i++) {
      if (state == IN_TEXT) {
        if (tagChange(otag, text, i)) {
          --i;
          addBuf();
          state = IN_TAG_TYPE;
        } else {
          if (text.charAt(i) == '\n') {
            filterLine(seenTag);
          } else {
            buf += text.charAt(i);
          }
        }
      } else if (state == IN_TAG_TYPE) {
        i += otag.length - 1;
        tag = tagTypes[text.charAt(i + 1)];
        tagType = tag ? text.charAt(i + 1) : '_v';
        if (tagType == '=') {
          i = changeDelimiters(text, i);
          state = IN_TEXT;
        } else {
          if (tag) {
            i++;
          }
          state = IN_TAG;
        }
        seenTag = i;
      } else {
        if (tagChange(ctag, text, i)) {
          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
                       i: (tagType == '/') ? seenTag - ctag.length : i + otag.length});
          buf = '';
          i += ctag.length - 1;
          state = IN_TEXT;
          if (tagType == '{') {
            if (ctag == '}}') {
              i++;
            } else {
              cleanTripleStache(tokens[tokens.length - 1]);
            }
          }
        } else {
          buf += text.charAt(i);
        }
      }
    }

    filterLine(seenTag, true);

    return tokens;
  }

  function cleanTripleStache(token) {
    if (token.n.substr(token.n.length - 1) === '}') {
      token.n = token.n.substring(0, token.n.length - 1);
    }
  }

  function trim(s) {
    if (s.trim) {
      return s.trim();
    }

    return s.replace(/^\s*|\s*$/g, '');
  }

  function tagChange(tag, text, index) {
    if (text.charAt(index) != tag.charAt(0)) {
      return false;
    }

    for (var i = 1, l = tag.length; i < l; i++) {
      if (text.charAt(index + i) != tag.charAt(i)) {
        return false;
      }
    }

    return true;
  }

  function buildTree(tokens, kind, stack, customTags) {
    var instructions = [],
        opener = null,
        token = null;

    while (tokens.length > 0) {
      token = tokens.shift();
      if (token.tag == '#' || token.tag == '^' || isOpener(token, customTags)) {
        stack.push(token);
        token.nodes = buildTree(tokens, token.tag, stack, customTags);
        instructions.push(token);
      } else if (token.tag == '/') {
        if (stack.length === 0) {
          throw new Error('Closing tag without opener: /' + token.n);
        }
        opener = stack.pop();
        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
        }
        opener.end = token.i;
        return instructions;
      } else {
        instructions.push(token);
      }
    }

    if (stack.length > 0) {
      throw new Error('missing closing tag: ' + stack.pop().n);
    }

    return instructions;
  }

  function isOpener(token, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].o == token.n) {
        token.tag = '#';
        return true;
      }
    }
  }

  function isCloser(close, open, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].c == close && tags[i].o == open) {
        return true;
      }
    }
  }

  Hogan.generate = function (tree, text, options) {
    var code = 'var _=this;_.b(i=i||"");' + walk(tree) + 'return _.fl();';
    if (options.asString) {
      return 'function(c,p,i){' + code + ';}';
    }

    return new Hogan.Template(new Function('c', 'p', 'i', code), text, Hogan, options);
  }

  function esc(s) {
    return s.replace(rSlash, '\\\\')
            .replace(rQuot, '\\\"')
            .replace(rNewline, '\\n')
            .replace(rCr, '\\r');
  }

  function chooseMethod(s) {
    return (~s.indexOf('.')) ? 'd' : 'f';
  }

  function walk(tree) {
    var code = '';
    for (var i = 0, l = tree.length; i < l; i++) {
      var tag = tree[i].tag;
      if (tag == '#') {
        code += section(tree[i].nodes, tree[i].n, chooseMethod(tree[i].n),
                        tree[i].i, tree[i].end, tree[i].otag + " " + tree[i].ctag);
      } else if (tag == '^') {
        code += invertedSection(tree[i].nodes, tree[i].n,
                                chooseMethod(tree[i].n));
      } else if (tag == '<' || tag == '>') {
        code += partial(tree[i]);
      } else if (tag == '{' || tag == '&') {
        code += tripleStache(tree[i].n, chooseMethod(tree[i].n));
      } else if (tag == '\n') {
        code += text('"\\n"' + (tree.length-1 == i ? '' : ' + i'));
      } else if (tag == '_v') {
        code += variable(tree[i].n, chooseMethod(tree[i].n));
      } else if (tag === undefined) {
        code += text('"' + esc(tree[i]) + '"');
      }
    }
    return code;
  }

  function section(nodes, id, method, start, end, tags) {
    return 'if(_.s(_.' + method + '("' + esc(id) + '",c,p,1),' +
           'c,p,0,' + start + ',' + end + ',"' + tags + '")){' +
           '_.rs(c,p,' +
           'function(c,p,_){' +
           walk(nodes) +
           '});c.pop();}';
  }

  function invertedSection(nodes, id, method) {
    return 'if(!_.s(_.' + method + '("' + esc(id) + '",c,p,1),c,p,1,0,0,"")){' +
           walk(nodes) +
           '};';
  }

  function partial(tok) {
    return '_.b(_.rp("' +  esc(tok.n) + '",c,p,"' + (tok.indent || '') + '"));';
  }

  function tripleStache(id, method) {
    return '_.b(_.t(_.' + method + '("' + esc(id) + '",c,p,0)));';
  }

  function variable(id, method) {
    return '_.b(_.v(_.' + method + '("' + esc(id) + '",c,p,0)));';
  }

  function text(id) {
    return '_.b(' + id + ');';
  }

  Hogan.parse = function(tokens, text, options) {
    options = options || {};
    return buildTree(tokens, '', [], options.sectionTags || []);
  },

  Hogan.cache = {};

  Hogan.compile = function(text, options) {
    // options
    //
    // asString: false (default)
    //
    // sectionTags: [{o: '_foo', c: 'foo'}]
    // An array of object with o and c fields that indicate names for custom
    // section tags. The example above allows parsing of {{_foo}}{{/foo}}.
    //
    // delimiters: A string that overrides the default delimiters.
    // Example: "<% %>"
    //
    options = options || {};

    var key = text + '||' + !!options.asString;

    var t = this.cache[key];

    if (t) {
      return t;
    }

    t = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
    return this.cache[key] = t;
  };
})(typeof exports !== 'undefined' ? exports : Hogan);

},{}],42:[function(require,module,exports){
/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// This file is for use with Node.js. See dist/ for browser files.

var Hogan = require('./compiler');
Hogan.Template = require('./template').Template;
module.exports = Hogan; 
},{"./compiler":41,"./template":43}],43:[function(require,module,exports){
/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var Hogan = {};

(function (Hogan, useArrayBuffer) {
  Hogan.Template = function (renderFunc, text, compiler, options) {
    this.r = renderFunc || this.r;
    this.c = compiler;
    this.options = options;
    this.text = text || '';
    this.buf = (useArrayBuffer) ? [] : '';
  }

  Hogan.Template.prototype = {
    // render: replaced by generated code.
    r: function (context, partials, indent) { return ''; },

    // variable escaping
    v: hoganEscape,

    // triple stache
    t: coerceToString,

    render: function render(context, partials, indent) {
      return this.ri([context], partials || {}, indent);
    },

    // render internal -- a hook for overrides that catches partials too
    ri: function (context, partials, indent) {
      return this.r(context, partials, indent);
    },

    // tries to find a partial in the curent scope and render it
    rp: function(name, context, partials, indent) {
      var partial = partials[name];

      if (!partial) {
        return '';
      }

      if (this.c && typeof partial == 'string') {
        partial = this.c.compile(partial, this.options);
      }

      return partial.ri(context, partials, indent);
    },

    // render a section
    rs: function(context, partials, section) {
      var tail = context[context.length - 1];

      if (!isArray(tail)) {
        section(context, partials, this);
        return;
      }

      for (var i = 0; i < tail.length; i++) {
        context.push(tail[i]);
        section(context, partials, this);
        context.pop();
      }
    },

    // maybe start a section
    s: function(val, ctx, partials, inverted, start, end, tags) {
      var pass;

      if (isArray(val) && val.length === 0) {
        return false;
      }

      if (typeof val == 'function') {
        val = this.ls(val, ctx, partials, inverted, start, end, tags);
      }

      pass = (val === '') || !!val;

      if (!inverted && pass && ctx) {
        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
      }

      return pass;
    },

    // find values with dotted names
    d: function(key, ctx, partials, returnFound) {
      var names = key.split('.'),
          val = this.f(names[0], ctx, partials, returnFound),
          cx = null;

      if (key === '.' && isArray(ctx[ctx.length - 2])) {
        return ctx[ctx.length - 1];
      }

      for (var i = 1; i < names.length; i++) {
        if (val && typeof val == 'object' && names[i] in val) {
          cx = val;
          val = val[names[i]];
        } else {
          val = '';
        }
      }

      if (returnFound && !val) {
        return false;
      }

      if (!returnFound && typeof val == 'function') {
        ctx.push(cx);
        val = this.lv(val, ctx, partials);
        ctx.pop();
      }

      return val;
    },

    // find values with normal names
    f: function(key, ctx, partials, returnFound) {
      var val = false,
          v = null,
          found = false;

      for (var i = ctx.length - 1; i >= 0; i--) {
        v = ctx[i];
        if (v && typeof v == 'object' && key in v) {
          val = v[key];
          found = true;
          break;
        }
      }

      if (!found) {
        return (returnFound) ? false : "";
      }

      if (!returnFound && typeof val == 'function') {
        val = this.lv(val, ctx, partials);
      }

      return val;
    },

    // higher order templates
    ho: function(val, cx, partials, text, tags) {
      var compiler = this.c;
      var options = this.options;
      options.delimiters = tags;
      var text = val.call(cx, text);
      text = (text == null) ? String(text) : text.toString();
      this.b(compiler.compile(text, options).render(cx, partials));
      return false;
    },

    // template result buffering
    b: (useArrayBuffer) ? function(s) { this.buf.push(s); } :
                          function(s) { this.buf += s; },
    fl: (useArrayBuffer) ? function() { var r = this.buf.join(''); this.buf = []; return r; } :
                           function() { var r = this.buf; this.buf = ''; return r; },

    // lambda replace section
    ls: function(val, ctx, partials, inverted, start, end, tags) {
      var cx = ctx[ctx.length - 1],
          t = null;

      if (!inverted && this.c && val.length > 0) {
        return this.ho(val, cx, partials, this.text.substring(start, end), tags);
      }

      t = val.call(cx);

      if (typeof t == 'function') {
        if (inverted) {
          return true;
        } else if (this.c) {
          return this.ho(t, cx, partials, this.text.substring(start, end), tags);
        }
      }

      return t;
    },

    // lambda replace variable
    lv: function(val, ctx, partials) {
      var cx = ctx[ctx.length - 1];
      var result = val.call(cx);

      if (typeof result == 'function') {
        result = coerceToString(result.call(cx));
        if (this.c && ~result.indexOf("{\u007B")) {
          return this.c.compile(result, this.options).render(cx, partials);
        }
      }

      return coerceToString(result);
    }

  };

  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos =/\'/g,
      rQuot = /\"/g,
      hChars =/[&<>\"\']/;


  function coerceToString(val) {
    return String((val === null || val === undefined) ? '' : val);
  }

  function hoganEscape(str) {
    str = coerceToString(str);
    return hChars.test(str) ?
      str
        .replace(rAmp,'&amp;')
        .replace(rLt,'&lt;')
        .replace(rGt,'&gt;')
        .replace(rApos,'&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }

  var isArray = Array.isArray || function(a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  };

})(typeof exports !== 'undefined' ? exports : Hogan);


},{}],44:[function(require,module,exports){
(function (module){
    "use strict";

    /*The following is the data format of a cache element
     name        : Name of the dependency
     singleton   : true/false
     fn          : Function constructor, can be a prototype or function.
     deps        : Array of dependencies where the names correspond to other named dependencies
     instance    : The instance of an element, can be pre constructed and passed in or constructed by fn.
     */

    var isArray = function isArray(o) { return Object.prototype.toString.call(o) === '[object Array]'; };
    var isString = function isString(s) { return Object.prototype.toString.call(s) === '[object String]'; };
    var isNull = function isNull(n) { return Object.prototype.toString.call(n) === '[object Null]'; };
    var isUndefined = function isUndefined(u) { return Object.prototype.toString.call(u) === '[object Undefined]'; };

    function factory (type){
        if (isString(type)){
            return type;
        }
        else if (isArray(type)){
            return type;
        }
        else {
            var tmp = function (args) {
                return type.apply(this, args);
            };
            // -- Newer browsers have a safer method of inheritance; sorry IE*.
            if ('create' in Object){
                tmp.prototype = Object.create(type.prototype, {
                    constructor: {
                        value: tmp,
                        enumerable : false,
                        writable: true,
                        configurable: true
                    }
                });
            }
            else { tmp.prototype = type.prototype; }
            return tmp;
        }
    };
    function addCategory(categories, category, name){
        (category in categories) ?
            (categories[category].push(name)) :
            (categories[category] = [name]);
    };

    var Nodeject = function Nodeject(options){
        this.config = options;
        this.cache = {};
        this.categories = {};
    };

    Nodeject.prototype.define = function (options){
        if (!(options.name)){ throw "Name is not found or is empty as part of the definition."; }
        //if (!options.type){ throw "Type isn't found or is empty as part of the definition."; }

        if (!('name' in this.cache)){
            if (isNull(options.type) || isUndefined(options.type)){
                this.cache[options.name] = {
                    singleton : false,
                    isEmpty : true,
                    instance : options.type
                };
                return this;
            }

            this.cache[options.name] = {
                singleton   : options.singleton || false,
                fn          : factory(options.type),
                deps        : options.deps || [],
                instance    : null,
                requiresNew : !(isString(options.type) || isArray(options.type))
            };

            if (options.category){
                var arr = options.category || [];
                if (isArray(arr)){
                    for (var i = 0; i < arr.length; i = i + 1){
                        addCategory(this.categories, arr[i], options.name);
                    }
                }
                else {
                    addCategory(this.categories, arr, options.name);
                }
            }
        }
        else { throw "Type or type name already defined in the container."; }

        return this;
    };

    Nodeject.prototype.resolve = function (options){
        var name = '', category = '', singleton = false;

        // -- Marshall incoming parameters to resolve the type.
        if (isString(options)){ name = options; }
        else if(options.name){ name = options.name || ''; }
        else if (options.category && isString(options.category)) { category = options.category; }
        else { throw "Cannot resolve"; }

        if (name in this.cache && this.cache[name].isEmpty){
            return this.cache[name].instance;
        }


        var deps, i;
        if (name in this.cache){
            var type = this.cache[name];
            singleton = options.singleton || type.singleton || false;

            // Resolve dependencies.
            deps = [];
            for(i = 0; i < type.deps.length; i = i + 1){
                var subtype = this.resolve(type.deps[i]);
                deps.push(subtype);
            }

            if (singleton){
                type.instance = type.instance || (type.requiresNew ? new type.fn(deps) : type.fn);
                return type.instance;
            }

            return type.requiresNew ? new type.fn(deps) : type.fn;
        }
        else if (category in this.categories){
            var types = this.categories[category] || [];
            var format = options.format || 'array';
            if (format === 'literal'){
                deps = {};
                for (i = 0; i < types.length; i = i + 1){
                    deps[types[i]] = this.resolve(types[i]);
                }
            }
            else {
                deps = [];
                for(i = 0; i < types.length; i = i + 1){
                    deps.push(this.resolve(types[i]));
                }
            }
            return deps;
        }
        else {
            throw "The type '" + name + "' is not configured in the container.";
        }
    };



    module.exports = Nodeject;

})(module)


















},{}],45:[function(require,module,exports){
//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.5.2';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? void 0 : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed > result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array, using the modern version of the 
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from an array.
  // If **n** is not specified, returns a single random element from the array.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (arguments.length < 2 || guard) {
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, value, context) {
      var result = {};
      var iterator = value == null ? _.identity : lookupIterator(value);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n == null) || guard ? array[0] : slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) {
      return array[array.length - 1];
    } else {
      return slice.call(array, Math.max(array.length - n, 0));
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, "length").concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error("bindAll must be passed function names");
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function() {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function() {
        var last = (new Date()) - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

},{}]},{},[2])