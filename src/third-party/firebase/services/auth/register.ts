import { IResponseApi } from "../../../../domains/IResponse";
import { getFirebaseTool } from "../../firebase";
import { IRegisterPayload } from "./interface";

const { firebaseAuth } = getFirebaseTool();

export const registerWithEmailAndPassword: (
  user: IRegisterPayload
) => Promise<IResponseApi<any>> = async (user) => {
  const { email, password } = user;
  try {
    await firebaseAuth.createUserWithEmailAndPassword(email, password);
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
