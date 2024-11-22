const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const { storeData, getData } = require('../services/firestoreService');

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;

    const { confidenceScore, label, suggestion } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
        "id": id,
        "result": label,
        "suggestion": suggestion,
        "createdAt": createdAt
    }

    await storeData(id, data);

    const response = h.response({
        status: 'success',
        message: confidenceScore > 0 ? 'Model is predicted successfully' : 'Model is predicted successfully but under threshold. Please use the correct picture',
        data
    });
    response.code(201);
    return response;
}

async function getPredictHistoriesHandler(request, h) {

    const response = h.response({
        status: 'success',
        data: await getData()
    });
    response.code(200);
    return response;
}

module.exports = { postPredictHandler, getPredictHistoriesHandler };