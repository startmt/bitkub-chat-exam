import { Container, makeStyles } from "@material-ui/core";
import { HeaderContainer, ChatListContainer } from "../services/chat-list";

const useStyles = makeStyles({
  chatRoomSection: {
    display: "flex",
  },
  chatRoomListSection: {
    marginTop: 16,
  },
  buttonWrapper: {
    marginTop: 16,
    textAlign: "right",
  },
});
const ChatListPage = () => {
  const classes = useStyles();
  return (
    <Container>
      <HeaderContainer />
      <ChatListContainer />
    </Container>
  );
};

export default ChatListPage;
