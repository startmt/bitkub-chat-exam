import { IResponseApi } from "../../../../domains/IResponse";
import { getFirebaseTool } from "../../firebase";
import {
  IChatRoomResponse,
  ICreateChatRoomResponse,
  IJoinChatRoomResponse,
  ISendMessagePayload,
} from "./interface";

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

export const joinChatRoom: (
  id: string
) => Promise<IResponseApi<IJoinChatRoomResponse | any>> = async (id) => {
  try {
    const user = firebaseAuth.currentUser;

    const userDocument = await firebaseFirestore
      .collection("users")
      .where("email", "==", user?.email)
      .get();

    if (userDocument.size > 0) {
      const chatRoomDoc = await firebaseFirestore
        .collection("chat-room")
        .doc(id)
        .get();
      const chatRoom = chatRoomDoc.data();
      if (chatRoom && chatRoom.usersId) {
        if (
          chatRoom.usersId.find((a: string) => a === userDocument.docs[0].id)
        ) {
          throw {
            code: "repeatedaddRoom",
            message: "You joined this room.",
          };
        }
        const payload = {
          usersId: [...chatRoom.usersId, userDocument.docs[0].id],
        };
        await firebaseFirestore.collection("chat-room").doc(id).update(payload);
        return { data: { id: chatRoomDoc.id }, isSuccess: true };
      } else {
        throw {
          code: "roomnotfount",
          message: "Can not find Room ID.",
        };
      }
    }
    throw "error";
  } catch (e) {
    console.log(e);
    return { error: e, isSuccess: false };
  }
};

export const getChatMessageList: (
  id: string
) => Promise<IResponseApi<any>> = async (id) => {
  try {
    const query = firebaseFirestore
      .collection("chat-room")
      .doc(id)
      .collection("chat-message")
      .orderBy("sentTime")
      .limit(100);

    return {
      data: { query: query },
      isSuccess: true,
    };
  } catch (e) {
    return {
      error: e,
      isSuccess: false,
    };
  }
};

export const getChatDetail: (
  id: string
) => Promise<IResponseApi<IChatRoomResponse | any>> = async (id) => {
  try {
    const chatDocument = await firebaseFirestore
      .collection("chat-room")
      .doc(id)
      .get();

    const chatDetail: IChatRoomResponse | any = chatDocument.data();

    return {
      isSuccess: true,
      data: chatDetail,
    };
  } catch (e) {
    return {
      isSuccess: false,
      error: null,
    };
  }
};

export const sendMessage: (
  data: ISendMessagePayload
) => Promise<IResponseApi<any>> = async (data) => {
  try {
    const user = firebaseAuth.currentUser;

    const userDocument = await firebaseFirestore
      .collection("users")
      .where("email", "==", user?.email)
      .get();

    if (userDocument.size > 0) {
      const payload = {
        message: data.message,
        sender: userDocument.docs[0].ref,
        sentTime: new Date(),
      };

      await firebaseFirestore
        .collection("chat-room")
        .doc(data.id)
        .collection("chat-message")
        .add(payload);
      return {
        isSuccess: true,
        data: null,
      };
    }
    throw {
      code: "unauthorized",
      message: "You are not signin",
    };
  } catch (e) {
    console.log(e);
    return {
      isSuccess: false,
      error: e,
    };
  }
};
