var config = require('./config.json');
var engines = require('consolidate');
var express = require('express');
var server = express();

var env = process.env['NODE_ENV'] || 'dev';
var log = require('./modules/log.js').init(config, env);

/* general config */
server.configure(function () {
    server.set('appName', config.appName);

    /*
     env - Environment mode, defaults to process.env.NODE_ENV or "development"
     trust proxy - Enables reverse proxy support, disabled by default
     jsonp callback name - Changes the default callback name of ?callback=
     json replacer - JSON replacer callback, null by default
     json spaces - JSON response spaces for formatting, defaults to 2 in development, 0 in production
     case sensitive routing - Enable case sensitivity, disabled by default, treating "/Foo" and "/foo" as the same
     strict routing - Enable strict routing, by default "/foo" and "/foo/" are treated the same by the router
     view cache - Enables view template compilation caching, enabled in production by default
     view engine - The default engine extension to use when omitted
     views - The view directory path, defaulting to "./views"
     */
    server.set('env', env);
    server.set('view engine', 'mustache');
    //server.set('views', './views');

    /* assign the mustache engine to .mustache files */
    server.engine('mustache', engines.hogan);

    /* logging every request */
    server.use(express.logger({stream: log.getWriteStream()}));
    server.use(express.static(__dirname + '/public'));

    /* Compress response data with gzip / deflate */
    server.use(express.compress());

    /* Request body parsing middleware supporting JSON, urlencoded, and multipart requests */
    server.use(express.json());
    server.use(express.urlencoded());
    //server.use(express.multipart());

    /* Parses the Cookie header field and populates req.cookies with an object keyed by the cookie names */
    server.use(express.cookieParser());

    /* Provides faux HTTP method support */
    server.use(express.methodOverride());

    server.use(server.router);

    /* Errors handling */
    server.use(function logErrors(err, req, res, next) {
        log.errorLog.error('error trapped in express', err)
        next(err);
    });
    server.use(function clientErrorHandler(err, req, res, next) {
        if (req.xhr) {
            res.send(500, { error: 'Something blew up!' });
        } else {
            next(err);
        }
    });
    server.use(function errorHandler(err, req, res, next) {
        res.status(500);
        res.render('error', { error: err });
    });
});

/* env-aware config: dev */
server.configure('dev', function () {
    server.locals({config: config.dev});
});

/* env-aware config: prod */
server.configure('prod', function () {
    server.locals({config: config.prod});
});

/* init our features server side */
var app = require('./features/app.server.js').init();

/* define routes */
app.commons.routing.init({
    server: server,
    log: log
});

server.listen(7889);