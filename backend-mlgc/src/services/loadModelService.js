const tensor = require('@tensorflow/tfjs-node');

async function loadModelService() {
    return tensor.loadGraphModel(process.env.MODEL_URL || "file://model/model.json");
}

module.exports = loadModelService;