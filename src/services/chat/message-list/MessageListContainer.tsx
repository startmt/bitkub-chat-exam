import { List } from "@material-ui/core";
import dayjs from "dayjs";
import { useAuthorize } from "../../chat-list/hooks/use-authorize";
import { FriendMessageItem, UserMessageItem } from "./components";
import { useMessageListContainer } from "./hook";

const MessageListContainer = () => {
  const { messageList, visibledRef } = useMessageListContainer();
  const { user } = useAuthorize();
  const mutateData = messageList.map((data) => ({
    ...data,
    isSelf: user?.email === data.sender.email,
    sentTime: dayjs(data.sentTime.toDate()).format("hh:mm a"),
  }));

  return (
    <List>
      {mutateData.map((m) => (
        <div>
          {m.isSelf ? (
            <UserMessageItem
              name={m.sender.name}
              message={m.message}
              sentTime={m.sentTime}
            />
          ) : (
            <FriendMessageItem
              name={m.sender.name}
              message={m.message}
              sentTime={m.sentTime}
            />
          )}
        </div>
      ))}
      <div id="last-message" ref={visibledRef} />
    </List>
  );
};

export default MessageListContainer;
