import firebase from "firebase";
export interface IChatRoomResponse {
  id: string;
  roomName: string;
  lastMessage?: {
    message: string;
    time: firebase.firestore.Timestamp;
  };
  // userId: string[];
}

export interface ICreateChatRoomResponse {
  id: string;
}

export interface IJoinChatRoomResponse {
  id: string;
}

export interface ISendMessagePayload {
  id: string;
  message: string;
}
