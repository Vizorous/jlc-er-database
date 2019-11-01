/* eslint-disable import/prefer-default-export */
import * as firebase from 'firebase';
import { } from 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
const firebaseConfig = {
  apiKey: 'AIzaSyB-xeN51KZyMucZRDzLY7HxgtjEeuu3Ctk',
  authDomain: 'er-jlc.firebaseapp.com',
  databaseURL: 'https://er-jlc.firebaseio.com',
  projectId: 'er-jlc',
  storageBucket: 'er-jlc.appspot.com',
  messagingSenderId: '329039602230',
  appId: '1:329039602230:web:a77824663a860c5d676e97',
  measurementId: 'G-NSCN1T1G9Q',
};
// console.log(typeof process.env.REACT_APP_PROJECT_ID);
// console.log(typeof process.env.REACT_APP_API_KEY);

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// export default firebase;
export { db, firebase };
