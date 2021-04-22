import { IResponseApi } from "../../../../domains/IResponse";
import { getFirebaseTool } from "../../firebase";

const { firebaseAuth } = getFirebaseTool();
export const signout: () => Promise<IResponseApi<any>> = async () => {
  try {
    await firebaseAuth.signOut();
    return {
      isSuccess: true,
      data: { message: "Signout success" },
    };
  } catch (e) {
    return {
      isSuccess: false,
      error: {
        code: "somethingwentwrong",
        message: "Something went wrong.",
      },
    };
  }
};
