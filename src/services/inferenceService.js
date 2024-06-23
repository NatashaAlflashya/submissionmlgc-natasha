const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
 
async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()
 
        const classes = ['Cancer', 'Non-cancer'];
 
        const prediction = model.predict(tensor);
        const score = await prediction.data();
 
        const classResult = score[0] > 0.5 ? 1 : 0;
        const result = classes[classResult];
        
        let suggestion;
 
        if(result === 'Cancer') {
            suggestion = "Segera periksa ke dokter!"
        }
 
        if(result === 'Non-cancer') {
            suggestion = "Kondisi aman dan sehat"
        }

        return { result, suggestion };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }
}
 
module.exports = predictClassification;