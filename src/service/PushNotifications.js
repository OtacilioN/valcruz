import firebase from "firebase";
import firebaseKeys from "./firebaseKeys.json";

export const requestPermission = async () => {
  try {
    const ms = firebase.messaging();
    const permission = await ms.requestPermission();
    if (permission === "granted") {
      const token = await ms.getToken();
      console.log("O token do usuário foi", token);
    } else {
      console.log("push notification negada");
    }

    /**
    Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // ...
    } else {
        console.log('Unable to get permission to notify.');
    }
    });
     */
  } catch {}
};
