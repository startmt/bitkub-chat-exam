import {
  AppBar,
  Container,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router";
import { PaperCard } from "../components";
import { AppbarContainer } from "../services/chat/appbar";
import { ChatRoomProvider, useChatRoomPage } from "../services/chat/contexts";

const useStyles = makeStyles({
  container: {
    height: "100vh",
    padding: 50,
  },
  paper: {
    borderRadius: 8,
    height: "100%",
    width: "100%",
  },
});
const ChatRoomPage = () => {
  const params: any = useParams();
  return (
    <ChatRoomProvider id={params.id}>
      <RenderChatPage />
    </ChatRoomProvider>
  );
};

const RenderChatPage = () => {
  const classes = useStyles({});
  const { messageList } = useChatRoomPage();
  return (
    <Container className={classes.container}>
      <PaperCard className={classes.paper}>
        <AppbarContainer />
      </PaperCard>
    </Container>
  );
};

export default ChatRoomPage;
