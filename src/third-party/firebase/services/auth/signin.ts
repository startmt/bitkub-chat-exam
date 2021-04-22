import { IResponseApi } from "../../../../domains/IResponse";
import { getFirebaseTool } from "../../firebase";
import { ISigninPayload } from "./interface";

const { firebaseAuth } = getFirebaseTool();

export const signinWithEmailAndPassword: (
  user: ISigninPayload
) => Promise<IResponseApi<any>> = async (user) => {
  const { email, password } = user;
  try {
    await firebaseAuth.signInWithEmailAndPassword(email, password);
    return {
      data: {},
      isSuccess: true,
    };
  } catch (e) {
    return {
      error: e,
      isSuccess: false,
    };
  }
};

export const updateDisplayname = async (displayName: string) => {
  const user = firebaseAuth.currentUser;

  if (user) {
    await user.updateProfile({
      displayName: displayName,
    });
  }
};
