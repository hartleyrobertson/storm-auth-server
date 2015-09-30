/**
 * Created by hartleyrobertson on 28/09/2015.
 */

var joi = require('joi'),
    boom = require('boom');

exports.register = function(server, options, next) {
    server.route({
        method: 'POST',
        path: '/register',
        config: {
            plugins: {
                'hapi-swaggered': {
                    operationId: 'register'
                }
            },
            description: 'Client Registration',
            tags: ['api'],
            notes: 'Registers user.',
            validate: {
                payload: joi.object({
                    email: joi.string().required().description('Email address'),
                    password: joi.string().required().description('Password')
                }).meta({
                    className: 'Register'
                })
            },
            response: {
                schema: joi.object({
                    code: joi.number().description('response code'),
                    message: joi.string().description('response message')
                }).meta({
                    className: 'Register'
                })
            }
        },
        handler: function(req, reply) {
            var payload = req.payload;

            // fill in the blanks, only care about email and password
            payload.givenName = 'name';
            payload.surname = 'surname';
            payload.username = payload.email;

            app.createAccount(payload, function(err, account) {
                if (err) return reply(boom.badRequest(err));

                var response = {
                    code: 201,
                    message: 'Registered'
                };

                return reply(response);
            });
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'register',
    version: '0.0.1'
};