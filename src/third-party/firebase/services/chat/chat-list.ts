import { IResponseApi } from "../../../../domains/IResponse";
import { getFirebaseTool } from "../../firebase";
import { IChatListResponse } from "./interface";

const { firebaseAuth, firebaseFirestore } = getFirebaseTool();

export const getUserChatList: () => Promise<
  IResponseApi<IChatListResponse[] | any>
> = async () => {
  try {
    const user = firebaseAuth.currentUser;

    const userDocument = await firebaseFirestore
      .collection("users")
      .where("email", "==", user?.email)
      .get();

    if (userDocument.size > 0) {
      const chatListQuery = await firebaseFirestore
        .collection("chat-room")
        .where("usersId", "array-contains", userDocument.docs[0].id)
        .get();
      const lastMessage =
        chatListQuery.size > 0 &&
        (await chatListQuery.docs[0]
          .data()
          .chatRef.collection("chat")
          .orderBy("time", "desc")
          .limit(1)
          .get());
      const chatList: IChatListResponse[] = chatListQuery.docs.map((d) => ({
        id: d.id,
        roomName: d.data().roomName,
        lastMessage: lastMessage.size > 0 ? lastMessage.docs[0].data() : null,
      }));

      return { data: chatList, isSuccess: true };
    }
    throw "error";
  } catch (e) {
    console.log(e);
    return { error: e, isSuccess: false };
  }
};
