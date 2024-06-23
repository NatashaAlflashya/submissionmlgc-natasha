const admin = require('firebase-admin');
const serviceAccount = require('../../submissionmlgc-natasha-426313-1e62ab7e7260.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
async function storeData(id, data) {
  try {
    const predictCollection = db.collection('predictions');
    console.log('Storing data with id:', id);
    await predictCollection.doc(id).set(data);
    console.log('Data stored successfully');
  } catch (error) {
    console.error('Error storing data to Firestore:', error);
    throw error;
  }
}

module.exports = storeData;

