import { Container } from "@material-ui/core";
import { HeaderContainer, ChatListContainer } from "../services/chat-list";
const ChatListPage = () => {
  return (
    <Container>
      <HeaderContainer />
      <ChatListContainer />
    </Container>
  );
};

export default ChatListPage;
