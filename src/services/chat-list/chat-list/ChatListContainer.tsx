import { List } from "@material-ui/core";
import { ChatListItem } from "./components";
import { useChatListContainer } from "./hook";

const ChatListContainer = () => {
  const { chatList, onClickChatRoom } = useChatListContainer();
  return (
    <List>
      {chatList.map((c) => {
        return (
          <ChatListItem
            onClick={onClickChatRoom}
            id={c.id}
            lastMessage={c.lastMessage}
            name={c.roomName}
          />
        );
      })}
    </List>
  );
};

export default ChatListContainer;
