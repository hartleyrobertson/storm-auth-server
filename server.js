/**
 * Created by hartleyrobertson on 24/09/2015.
 */

var Hapi = require('hapi'),
    h2o2 = require('h2o2'),
    inert = require('inert'),
    vision = require('vision'),
    config = require('./config'),
    server = new Hapi.Server(),
    hapiSwaggeredUi = require('hapi-swaggered-ui'),
    hapiSwaggered = require('hapi-swaggered');

var app = null,
    storm = require('./lib/storm');
    registerRoute = require('./routes/register'),
    loginRoute = require('./routes/login');

server.connection({
    host: config.get('http.listen'),
    port: config.get('http.port'),
    labels: ['api'],
    routes: {
        cors: true
    }
});

// swagger
server.register({
    register: hapiSwaggered,
    options: {
        produces: ['application/json'],
        tags: {
            '/foobar': 'Example foobar description'
        },
        info: {
            title: 'api-oauth.style.com',
            description: 'Style.com oauth server',
            version: '0.1'
        }
    }
}, {
    select: 'api',
    routes: {
        prefix: '/swagger'
    }
}, function(err) {
    if (err) {
        throw err
    }
});

// swagger ui browser client
server.register([
    h2o2,
    inert,
    vision,
    {
        register: hapiSwaggeredUi,
        options: {
            swaggerEndpoint: '/swagger/swagger',
            title: 'authserver',
            authorization: {
                field: 'apiKey',
                scope: 'query'
            }
        }
    }], {
    select: 'api',
    routes: {
        prefix: '/docs'
    }
}, function(err) {
    if (err) throw err;
});

// api
server.register([
    {
        register: registerRoute
    },
    {
        register: loginRoute
    }
], function(err) {
    if (err) throw err;
});

server.start(function () {
    storm.init(function(err) {
        if (err) throw err;

        console.log('info', 'server running at: ' + server.info.uri);
    });
});