/**
 * Created by hartleyrobertson on 28/09/2015.
 */

var joi = require('joi'),
    boom = require('boom');

exports.register = function(server, options, next) {
    server.route({
        method: 'POST',
        path: '/login',
        config: {
            plugins: {
                'hapi-swaggered': {
                    operationId: 'login'
                }
            },
            description: 'Client Login',
            tags: ['api'],
            notes: 'Signs in user.',
            validate: {
                payload: joi.object({
                    email: joi.string().required().description('Email Address'),
                    password: joi.string().required().description('Password')
                }).meta({
                    className: 'Sign in'
                })
            }
        },
        handler: function(req, reply) {
            var payload = req.payload;

            // map email to username
            payload.username = payload.email;
            delete payload.email;

            app.authenticateAccount(payload, function (err, result) {
                if (err) return reply(boom.badRequest(err));
                return reply(result.account);
            });
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'login',
    version: '0.0.1'
};