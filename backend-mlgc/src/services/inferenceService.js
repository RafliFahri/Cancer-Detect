const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
    try {
        const tensor = tf.node
          .decodeJpeg(image).resizeNearestNeighbor([224, 224])
          .expandDims().toFloat();
        console.log('Tensor Shape:', tensor.shape);
        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score)*100;
        console.log(confidenceScore);
        let result = { confidenceScore, label: '', suggestion: '' };
        if (confidenceScore > 1) {
            result.label = 'Cancer';
            result.suggestion = 'Segera periksa ke dokter!';
        } else {
            result.label = 'Non-cancer';
            result.suggestion = 'Penyakit kanker tidak terdeteksi.';
        }

        return result;
    } catch (error) {
        throw new InputError("Terjadi kesalahan dalam melakukan prediksi");
    }
}

module.exports = predictClassification;