import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLoadingCallback } from "react-loading-hook";
import { IResponseSuccessApi } from "../../../domains/IResponse";
import { firebaseServices } from "../../../third-party/firebase";

type IChatRoomContextResponse = {
  messageList: any[];
  isChatLoading: boolean;
} | null;

const ChatRoomContext = createContext<IChatRoomContextResponse>(null);

interface IChatRoomProviderprops {
  id: string;
}
export const ChatRoomProvider: React.FC<IChatRoomProviderprops> = (props) => {
  const { id, children } = props;
  const { messageList, isChatLoading } = useQueryChatListService(id);

  const responseValue: IChatRoomContextResponse = {
    messageList: messageList,
    isChatLoading: isChatLoading,
  };
  return (
    <ChatRoomContext.Provider value={responseValue}>
      {Children.toArray(children)}
    </ChatRoomContext.Provider>
  );
};

export const useChatRoomPage = () => {
  const hooks = useContext(ChatRoomContext);
  return { ...hooks };
};

const useQueryChatListService = (id: string) => {
  const [messageList, setMessageList] = useState<any[]>([]);

  const handleService = async () => {
    const dataList = await firebaseServices.chatService.getChatMessageList(id);
    if (dataList.isSuccess) {
      const response = dataList as IResponseSuccessApi<any[]>;
      setMessageList(response.data);
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
