import { IResponseApi } from "../../../../domains/IResponse";
import { getFirebaseTool } from "../../firebase";
import { ICreateChatRoomResponse } from "./interface";

const { firebaseAuth, firebaseFirestore } = getFirebaseTool();

export const createChatRoom: (
  name: string
) => Promise<IResponseApi<ICreateChatRoomResponse | any>> = async (name) => {
  try {
    const user = firebaseAuth.currentUser;

    const userDocument = await firebaseFirestore
      .collection("users")
      .where("email", "==", user?.email)
      .get();

    if (userDocument.size > 0) {
      const payload = {
        roomName: name,
        usersId: [userDocument.docs[0].id],
      };
      const response = await firebaseFirestore
        .collection("chat-room")
        .add(payload);

      const chatRef = { chatRef: response };
      await firebaseFirestore
        .collection("chat-room")
        .doc(response.id)
        .update(chatRef);

      return { data: { id: response.id }, isSuccess: true };
    }
    throw "error";
  } catch (e) {
    console.log(e);
    return { error: e, isSuccess: false };
  }
};
