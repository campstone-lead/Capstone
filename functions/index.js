// /* eslint-disable consistent-return */
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


app.post('/upload', async (req, res) => {
  (async () => {
    try {

      const image = req.body;
      const metadata = { contentType: 'image/jpeg' }
      const file
      console.log('Uploaded!')
    } catch (err) {
      console.log(err)
    }
    // console.log('Image is here', image)
    res.json('here')
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
})();

});
// app.get('/meetings', async (req, res) => {
//   (async () => {
//     try {
//       let query = firestore.collection('meetings');
//       let response = [];
//       await query.get().then(querySnapshot => {
//         let docs = querySnapshot.docs;
//         for (let doc of docs) {
//           const selectedItem = {
//             id: doc.id,
//             data: doc.data()
//           };
//           response.push(selectedItem);
//         }
//       });
//       return res.status(200).send(response);
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send(error);
//     }
//   })();
// });
// app.get('/meetings/:meetingId', async (req, res) => {
//   (async () => {
//     try {
//       const document = firestore.collection('meetings').doc(req.params.meetingId);
//       let user = await document.get();
//       let response = user.data();
//       return res.status(200).send(response);
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send(error);
//     }
//   })();
// });
// app.get('/users/:userId', async (req, res) => {
//   (async () => {
//     try {
//       const document = await firestore.collection('users').doc(req.params.userId);
//       let user = await document.get();
//       let response = user.data();
//       return res.status(200).send(response);
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send(error);
//     }
//   })();
// });

// app.put('/users/update/:userId', async (req, res) => {
//   (async () => {
//     try {
//       const user = firestore.collection("users").doc(req.params.userId);
//       await user.update(req.body)
//       return res.status(200).send()
//     } catch (err) {
//       console.log(err)
//       return res.status(500).send(err)
//     }
//   })();
// })

// app.post('/users/create', (req, res) => {
//   // const {id,email,firstName,lastName,password}=req.body;
//   (async () => {
//     try {
//       await firestore.collection('users').doc(req.body.email).set(req.body)
//       return res.status(200).send();
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send(error);
//     }
//   })()
// });
// app.post('/meetings/create', (req, res) => {
//   // const {id,email,firstName,lastName,password}=req.body;
//   (async () => {
//     try {
//       const lat = req.body.location.latitude
//       const lng = req.body.location.longitude
//       console.log(typeof req.body.date)
//       await firestore.collection('meetings').doc(req.body.name).set({
//         name: req.body.name,
//         description: req.body.description,
//         location: new admin.firestore.GeoPoint(lat, lng),
//         date: req.body.date,
//         user: req.body.user
//       })

//       const document = await firestore.collection('meetings').doc(req.body.name);
//       let user = await document.get();
//       let response = user.data();
//       return res.status(200).send(response);

//     } catch (error) {
//       console.log(error);
//       return res.status(500).send(error);
//     }
//   })()
// });



exports.api = functions.https.onRequest(app);
