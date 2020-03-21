import firebase from "firebase";
import "firebase/firestore";
import firebaseKeys from "./firebaseKeys.json";

export const initFirebase = () => {
  firebase.initializeApp(firebaseKeys);
};

export const setUser = user => {
  const db = firebase.firestore();
  db.collection("users")
    .add(user)
    .then(docRef => {
      localStorage.setItem("userId", docRef.id);
    });
};

export const reportHealthCheck = healthCheck => {
  const db = firebase.firestore();
  const userId = localStorage.getItem("userId");
  const timeStamp = Date.now();
  const reportObject = {};
  reportObject[timeStamp] = healthCheck;
  db.collection("healthChecks")
    .doc(userId)
    .set(reportObject, { merge: true });
};

export const getContent = async () => {
  const db = firebase.firestore();
  const querySnapshot = await db.collection("content").get();
  const content = {};
  querySnapshot.forEach(doc => {
    content[doc.id] = doc.data();
  });
  return content;
};
