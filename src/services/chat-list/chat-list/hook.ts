import { useEffect, useState } from "react";
import { useLoadingCallback } from "react-loading-hook";
import { useHistory } from "react-router";
import { IResponseSuccessApi } from "../../../domains/IResponse";
import { firebaseServices } from "../../../third-party/firebase";
import { IChatListResponse } from "../../../third-party/firebase/services/chat/interface";
import { useAuthorize } from "../../auth/hooks/use-authorize";

export const useChatListContainer = () => {
  const { user } = useAuthorize();
  const { chatList, isChatLoading } = useQueryChatListService();
  const history = useHistory();
  const onClickChatRoom = (id: string) => {
    history.push(`/chat-room/${id}`);
  };
  return { user, chatList, isChatLoading, onClickChatRoom };
};

const useQueryChatListService = () => {
  const [chatList, setChatList] = useState<IChatListResponse[]>([]);

  const handleService = async () => {
    const dataList = await firebaseServices.chatService.getUserChatList();
    if (dataList.isSuccess) {
      const response = dataList as IResponseSuccessApi<IChatListResponse[]>;
      setChatList(response.data);
    }
  };

  const [chatListService, isChatLoading] = useLoadingCallback(handleService);

  useEffect(() => {
    chatListService();
  }, []);

  return {
    chatList,
    isChatLoading,
  };
};
