const predictClassification = require('../services/inferenceService');
const storeData = require('../services/storeData');
const crypto = require('crypto');

async function postPredictHandler(request, h) {
  try {
    const { image } = request.payload;
    const { model } = request.server.app;

    console.log('Received image for prediction');
    if (!image) {
      throw new Error('Image not provided in the request payload');
    }

    console.log('Starting prediction');
    const { result, suggestion } = await predictClassification(model, image);
    console.log('Prediction completed successfully');

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
      id,
      result,
      suggestion,
      createdAt,
    };

    console.log('Storing prediction result');
    await storeData(id, data);
    console.log('Prediction result stored successfully');

    const response = h.response({
      status: 'success',
      message: 'Model is predicted successfully.',
      data,
    });
    response.code(201);
    return response;

  } catch (error) {
    console.error('Error in postPredictHandler:', error.message);
    const response = h.response({
      status: 'error',
      message: 'Failed to predict the model.',
      error: error.message,
    });
    response.code(500);
    return response;
  }
}

module.exports = postPredictHandler;
