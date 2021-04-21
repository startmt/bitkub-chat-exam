import { getFirebaseTool } from "../../firebase";
import firebase from "firebase";
const { firebaseAuth } = getFirebaseTool();
export const getUserDetail = (
  onUserAuth: (user: firebase.User | null) => void
) => {
  firebaseAuth.onAuthStateChanged((user) => {
    onUserAuth(user);
  });
};
