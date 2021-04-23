import { useEffect, useRef, useState } from "react";
import { useLoadingCallback } from "react-loading-hook";
import { useParams } from "react-router";
import { IResponseSuccessApi } from "../../../domains/IResponse";
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

  const handleService = async () => {
    const dataList = await firebaseServices.chatService.getChatMessageList(id);
    if (dataList.isSuccess) {
      const response = dataList as IResponseSuccessApi<any>;
      response.data.query.onSnapshot(
        async (
          querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
        ) => {
          const dataList = await Promise.all(
            querySnapshot.docs.map(async (d) => {
              const senderQuery = await d.data().sender.get();

              const response = {
                sender: senderQuery.data(),
                sentTime: d.data().sentTime,
                message: d.data().message,
              };
              return response;
            })
          );
          setMessageList(dataList);
        }
      );
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
