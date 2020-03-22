import firebase from "firebase";
import { setPushKeys } from "../service/firestore";


export const requestPermission = async () => {
  let token = localStorage.getItem("pushtoken")
  if(token == null){
    const ms = firebase.messaging();
    await ms.requestPermission();
    token = await ms.getToken();
    setPushKeys(token)
    localStorage.setItem("pushtoken", token)
    console.log(token)
  }
  else{
    console.log("Already Approved")
  }
};
