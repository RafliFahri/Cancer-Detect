const { Firestore } = require('@google-cloud/firestore');

async function db() {
    return new Firestore();
}

async function storeData(id, data) {
    const predictCollection = (await db()).collection('predictions');
    return predictCollection.doc(id).set(data);
}

async function getData() {
    const predictionsRef = (await db()).collection('predictions');
    const snapshot = await predictionsRef.get();
    let data = [];
    snapshot.forEach(doc => { data.push({
        id: doc.id,
        history: {
            result: doc.data().result,
            suggestion: doc.data().suggestion,
            createdAt: doc.data().createdAt,
            id: doc.id
        }
    }) });
    return data;
}

module.exports = { storeData, getData };