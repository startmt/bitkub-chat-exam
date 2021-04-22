import { IResponseApi, IResponseFailApi } from "../../../../domains/IResponse";
import { getFirebaseTool } from "../../firebase";
import { ICreateUserFireStorePayload, IRegisterPayload } from "./interface";

const { firebaseAuth, firebaseFirestore } = getFirebaseTool();

export const registerWithEmailAndPassword: (
  user: IRegisterPayload,
  userFirestore: ICreateUserFireStorePayload
) => Promise<IResponseApi<any>> = async (user, userFirestore) => {
  const { email, password } = user;
  try {
    const data = await firebaseAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    data.user?.updateProfile({
      displayName: userFirestore.name,
    });
    await createUserOnFirestore(userFirestore);
    return {
      data: {},
      isSuccess: true,
    };
  } catch (e) {
    return {
      error: e,
      isSuccess: false,
    } as IResponseFailApi<any>;
  }
};

export const createUserOnFirestore = async (
  users: ICreateUserFireStorePayload
) => {
  firebaseFirestore.collection("users").add(users);
};
