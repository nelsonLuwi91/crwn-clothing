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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // const userRef = firestore.doc("users/128fdashadu");
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  // console.log(firestore.doc("users/12fdashadu"));
  // console.log(snapShot);
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;