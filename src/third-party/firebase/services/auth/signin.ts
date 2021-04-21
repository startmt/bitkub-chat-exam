import { createFirebaseConnection } from "../../firebase";
import { ISigninPayload } from "./interface";

const { firebaseAuth } = createFirebaseConnection();
export const signinWithEmailAndPassword = (user: ISigninPayload) => {
  const { email, password } = user;
  firebaseAuth
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
