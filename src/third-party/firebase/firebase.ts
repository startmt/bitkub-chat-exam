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
  measurementId?: string;
}

export const defaultConfig: IFirebaseConfig = {
  apiKey: "AIzaSyBcljDuS2omRoD_5aPjpXJ9RueudQj6WYs",
  authDomain: "bitkub-chat-app-e.firebaseapp.com",
  projectId: "bitkub-chat-app-e",
  storageBucket: "bitkub-chat-app-e.appspot.com",
  messagingSenderId: "293090064704",
  appId: "1:293090064704:web:3f9616b8d6242c3285e2a5",
};

export let firebaseInstance: firebase.app.App;

export const createFirebaseConnection = (
  config: IFirebaseConfig = defaultConfig
) => {
  if (firebase.apps.length > 0) {
    firebaseInstance = firebase.apps[0];
  } else if (!firebaseInstance) {
    firebaseInstance = firebase.initializeApp(config);
  }
};

export const getFirebaseTool = (config: IFirebaseConfig = defaultConfig) => {
  createFirebaseConnection(config);
  return {
    firebaseAuth: firebaseInstance.auth(),
    firebaseFirestore: firebaseInstance.firestore(),
  };
};
