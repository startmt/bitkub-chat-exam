import { useEffect, useRef, useState } from "react";
import { useLoadingCallback } from "react-loading-hook";
import { useParams } from "react-router";
import {
  IResponseFailApi,
  IResponseSuccessApi,
} from "../../../domains/IResponse";
import { firebaseServices } from "../../../third-party/firebase";
import { useIsVisible } from "react-is-visible";
import firebase from "firebase";
export const useMessageListContainer = () => {
  const params: any = useParams();
  const { messageList } = useQueryChatListService(params.id);
  const nodeRef = useRef(null);
  const isVisibled = useIsVisible(nodeRef);
  useEffect(() => {
    if (isVisibled) {
      const scrollelement = document.getElementById("last-message");
      scrollelement && scrollelement.scrollIntoView();
    }
  }, [messageList, isVisibled]);
  return {
    messageList,
    isVisibled,
    visibledRef: nodeRef,
  };
};

const useQueryChatListService = (id: string) => {
  const [messageList, setMessageList] = useState<any[]>([]);

  const handleMessageList = (data: any[]) => {
    setMessageList(data);
  };
  const handleService = async () => {
    const dataList = await firebaseServices.chatService.getChatMessageList(
      id,
      handleMessageList
    );
    if (!dataList.isSuccess) {
      const res = dataList as IResponseFailApi<any>;
      if (res.error.code === "notallow") {
        window.location.pathname = "/main";
      }
    }
  };

  const [messageListQuery, isChatLoading] = useLoadingCallback(handleService);

  useEffect(() => {
    messageListQuery();
  }, []);

  return {
    messageList,
    isChatLoading,
  };
};
