import firebase from 'firebase'
const firebase_storage_api = "capstone-266820.appspot.com"
var firebaseConfig = {
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  databaseURL: process.env.FIREBASE_databaseURL,
  projectId: process.env.FIREBASE_projectId,
  storageBucket: firebase_storage_api,
  messagingSenderId: process.env.FIREBASE_messagingSenderId,
  appId: process.env.FIREBASE_appId,
  measurementId: process.env.FIREBASE_measurementId
};
firebase.initializeApp(firebaseConfig);
export { firebase, firebase_storage_api }
