import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export const defaultConfig: IFirebaseConfig = {
  apiKey: "AIzaSyAlkWKKGtEuP0lqpd_bOilPQGacCrjdlVw",
  authDomain: "chat-example-9cfb5.firebaseapp.com",
  projectId: "chat-example-9cfb5",
  storageBucket: "chat-example-9cfb5.appspot.com",
  messagingSenderId: "539927010807",
  appId: "1:539927010807:web:815db4dabfb55726f562f2",
  measurementId: "G-P1H2BRP5M3",
};

export const createFirebaseConnection = (
  config: IFirebaseConfig = defaultConfig
) => {
  if (firebase.apps.length === 0) {
    const firebaseConfig = config;
    firebase.initializeApp(firebaseConfig);
  }
  return {
    firebaseAuth: firebase.auth(),
  };
};
