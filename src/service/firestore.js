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

export const updateUser = user => {
  const db = firebase.firestore();
  const userId = localStorage.getItem("userId");
  db.collection("users")
    .doc(userId)
    .set(user, { merge: true });
};

export const setPushKeys = pushkey => {
  const db = firebase.firestore();
  const userId = localStorage.getItem("userId");
  db.collection("users")
    .doc(userId)
    .update({ pushkey: pushkey });
};

export const reportHealthCheck = async healthCheck => {
  const db = firebase.firestore();
  healthCheck.userId = localStorage.getItem("userId");
  healthCheck.role = localStorage.getItem("role");
  healthCheck.timeStamp = Date.now();

  const docRef = await db.collection("healthChecks").add(healthCheck);
  return docRef.id;
};

export const updateHealthCheck = (healthCheck, id) => {
  const db = firebase.firestore();
  db.collection("healthChecks")
    .doc(id)
    .set(healthCheck, { merge: true });
};

export const getContent = async target => {
  const db = firebase.firestore();
  const querySnapshot = await db
    .collection("content")
    .where("target", "==", target)
    .get();
  const content = {};
  querySnapshot.forEach(doc => {
    content[doc.id] = doc.data();
  });

  const querySnapshot2 = await db
    .collection("content")
    .where("target", "==", "all")
    .get();
  querySnapshot2.forEach(doc => {
    content[doc.id] = doc.data();
  });

  return content;
};
