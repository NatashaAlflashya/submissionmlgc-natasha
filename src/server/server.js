require('dotenv').config();
 
const Hapi = require('@hapi/hapi');
const routes = require('../server/routes');
const loadModel = require('../services/loadModel');
const InputError = require('../exceptions/InputError');
 
(async () => {
    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0',
        routes: {
            cors: {
              origin: ['*'],
            },
        },
    });
 
    const model = await loadModel();
    server.app.model = model;
 
    server.route(routes);
 
    server.ext('onPreResponse', function (request, h) {
        const response = request.response;
 
        if (response instanceof InputError) {
            const newResponse = h.response({
                code: response.output.statusCode,
                status: 'fail',
                message: `${JSON.stringify(response.output.message)} Silakan gunakan foto lain.`
            })
            newResponse.code(parseInt(JSON.stringify(response.output.statusCode)))
            return newResponse;
        }
 
        if (response.isBoom) {
            let message;
            message = response.output.payload.message;

            if (response.output.statusCode === 413){
                message = "Payload content length greater than maximum allowed: 1000000"
            }

            const newResponse = h.response({
                code: response.output.statusCode,
                status: 'fail',
                message: message
            })
            console.log('Error')
            
            newResponse.code(parseInt(JSON.stringify(response.output.statusCode)))
            return newResponse;
        }
 
        return h.continue;
    });
 
    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();