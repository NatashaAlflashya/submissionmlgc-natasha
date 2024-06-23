const tf = require('@tensorflow/tfjs-node');

const loadModel = async () => {
    try {
        const modelUrl = process.env.MODEL_URL;
        if (!modelUrl) {
            throw new Error("MODEL_URL environment variable is not set.");
        }
        console.log("Attempting to load model from URL:", modelUrl);
        const model = await tf.loadGraphModel(modelUrl);
        console.log("Model loaded successfully");
        return model;
    } catch (err) {
        console.error("Load Model Error", err);
    }
};

module.exports = loadModel;
