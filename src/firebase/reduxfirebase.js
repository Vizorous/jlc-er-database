/* eslint-disable no-underscore-dangle */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'; // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
// import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

const fbConfig = {
  apiKey: 'AIzaSyB-xeN51KZyMucZRDzLY7HxgtjEeuu3Ctk',
  authDomain: 'er-jlc.firebaseapp.com',
  databaseURL: 'https://er-jlc.firebaseio.com',
  projectId: 'er-jlc',
  storageBucket: 'er-jlc.appspot.com',
  messagingSenderId: '329039602230',
  appId: '1:329039602230:web:a77824663a860c5d676e97',
  measurementId: 'G-NSCN1T1G9Q',
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

// Initialize other services on firebase instance
const db = firebase.firestore(); // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  // firestore: firestoreReducer // <- needed if using firestore
});
const initialState = {};
const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
};

// Create store with reducers and initial state
export {
  store, db, firebase, rrfProps,
};
