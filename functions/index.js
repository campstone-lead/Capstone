// /* eslint-disable consistent-return */



//function taht renames duplicates in the cloud storage->can be modified
// const functions = require('firebase-functions');
// const { Storage } = require('@google-cloud/storage');
// let gcs = new Storage({
//   projectId: 'capstone-266820'
// });

// const os = require('os')
// const path = require('path')
// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// exports.onFileChange = functions.storage.object().onFinalize(event => {
//   console.log('Event is here', event)

//   const bucket = event.bucket;
//   const contentType = event.contentType;
//   const filePath = event.name;
//   console.log('File change detected, function execution started');


//   if (path.basename(filePath).startsWith('renamed-')) {
//     console.log('We already renamed that file')
//     return;
//   }

//   const destinationBucket = gcs.bucket(bucket);
//   const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
//   const metadata = { contentType: contentType };

//   return destinationBucket.file(filePath).download({
//     destination: tmpFilePath
//   }).then(() => {
//     return destinationBucket.upload(tmpFilePath, {
//       destination: 'renamed-' + path.basename(filePath),
//       metadata: metadata
//     })
//   })

// });
const functions = require('firebase-functions');
const { Storage } = require('@google-cloud/storage');
let gcs = new Storage({
  projectId: 'capstone-266820'
});
const express = require('express')
const app = express();
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();
const corsPath = (process.env.NODE_ENV === 'production' ? 'https://harmonious-capstone.herokuapp.com/' : 'http://localhost:8100')
const config = {
  origin: 'http://localhost:8100',
  credentials: true
};
const cors = require('cors');
app.use(cors(config));

//not working for uploading pictures but can be modified for other API purposes!
app.post('/upload', async (req, res) => {
  (async () => {
    try {

      const image = req.body;
      console.log('parsed imeage', image)
      const metadata = { contentType: 'image/jpeg' }
    } catch (err) {
      console.log(err)
    }
  })();

});




exports.api = functions.https.onRequest(app);
