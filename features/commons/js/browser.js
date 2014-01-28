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
                    /(trident).*(rv[ :][\w.]+)/.exec(ua) ||
                    ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
                    [];
                
                var result = {
                    browser: match[1] || '',
                    version: match[2] || '0'
                };

                /* special stuff for IE11 detection */
                result.browser = (result.browser === 'trident' ? 'msie' : result.browser);
                result.version = (result.version === 'rv:11.0' ? '11' : result.version);

                return result;
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