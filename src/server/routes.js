const { max } = require('@tensorflow/tfjs-node');
const postPredictHandler = require('../server/handler');
 
const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 1e6,
        failAction: 'error'
      }
    }
    }
]

module.exports = routes;