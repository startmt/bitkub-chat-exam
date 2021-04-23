import { useEffect, useState } from "react";
import { useLoadingCallback } from "react-loading-hook";
import { IResponseSuccessApi } from "../../../domains/IResponse";
import { firebaseServices } from "../../../third-party/firebase";
import { IChatRoomResponse } from "../../../third-party/firebase/services/chat/interface";

export const useAppbarContainer = (id: string) => {
  const { chatRoom } = useQueryChatRoomService(id);
  return { chatRoom };
};

const useQueryChatRoomService = (id: string) => {
  const [chatRoom, setChatRoom] = useState<IChatRoomResponse | null>(null);

  const handleService = async () => {
    const dataList = await firebaseServices.chatService.getChatDetail(id);
    if (dataList.isSuccess) {
      const response = dataList as IResponseSuccessApi<IChatRoomResponse>;
      setChatRoom(response.data);
    }
  };

  const [messageListQuery, isChatLoading] = useLoadingCallback(handleService);

  useEffect(() => {
    messageListQuery();
  }, []);

  return {
    chatRoom,
    isChatLoading,
  };
};
