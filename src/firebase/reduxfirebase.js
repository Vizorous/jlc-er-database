import { createStore, combineReducers, compose } from 'redux';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

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
const rfConfig = {}; // optional redux-firestore Config Options

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore through Firebase
firebase.firestore();

// Add reduxFirestore store enhancer to store creator
const createStoreWithFirebase = compose(
  reduxFirestore(firebase), // firebase instance as first argument, rfConfig as optional second
)(createStore);

// Add Firebase to reducers
const rootReducer = combineReducers({
  firestore: firestoreReducer,
});

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState);
export default store;
