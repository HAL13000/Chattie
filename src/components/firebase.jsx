import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDdc4JVPuFO8eFNRkTH94eCMhc9I33m7P4",
  authDomain: "chattie-529f4.firebaseapp.com",
  projectId: "chattie-529f4",
  storageBucket: "chattie-529f4.appspot.com",
  messagingSenderId: "77390761383",
  appId: "1:77390761383:web:e13bb4d25d02a46aba7a82",
  measurementId: "G-LNY9J5NSNY",
});

const db = firebaseApp.firestore();

const auth = firebase.auth();
// そのままファイルからfirestoreとauthはインポート

export { firebaseApp, db, auth };
