import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDD8geMBqxb4KrzZl1yGDqU3DeWj0C9OaQ",
  authDomain: "crwn-db-d8e3c.firebaseapp.com",
  databaseURL: "https://crwn-db-d8e3c.firebaseio.com",
  projectId: "crwn-db-d8e3c",
  storageBucket: "crwn-db-d8e3c.appspot.com",
  messagingSenderId: "931505623542",
  appId: "1:931505623542:web:250814e0d379f36badf7d7",
  measurementId: "G-3TKCGHHN81"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;