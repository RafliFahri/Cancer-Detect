require('dotenv').config();
const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const loadModel = require('../services/loadModelService');
const InputError = require("../exceptions/InputError");

(async () => {
    const server = Hapi.server({
        port: process.env.APP_PORT || 8080,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*']
            },
            payload: {
                maxBytes: 1000000
            }
        }
    });
    server.app.model = await loadModel();

    server.route(routes);

    server.ext("onPreResponse", (request, h) => {
        const response = request.response;

        if (response instanceof InputError) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            });
            newResponse.code(response.statusCode);
            return newResponse;
        }

        if (response.isBoom) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            });
            newResponse.code(response.output.statusCode);
            return newResponse;
        }

        return h.continue;
    });

    await server.start();
    console.log(`Server start in ${server.info.uri}`);
})();