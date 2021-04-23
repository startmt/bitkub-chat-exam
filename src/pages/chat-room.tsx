import { Container, createStyles, makeStyles } from "@material-ui/core";
import { PaperCard } from "../components";
import { AppbarContainer } from "../services/chat/appbar";
import MessageListContainer from "../services/chat/message-list/MessageListContainer";
import SendMesssageFormContainer from "../services/chat/send-message-form/SendMessageFormContainer";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      height: "100vh",
      padding: 50,
      [theme.breakpoints.down("md")]: {
        padding: 0,
      },
    },
    paper: {
      borderRadius: 8,
      height: "100%",
      width: "100%",
    },
    messageListSection: {
      width: "100%",
      height: "calc(100% - 80px)",
      overflow: "scroll",
      [theme.breakpoints.down("md")]: {
        height: "calc(100% - 96px)",
      },
    },
    formSection: {
      width: "100%",
    },
  })
);

const ChatRoomPage = () => {
  const classes = useStyles({});
  return (
    <Container className={classes.container}>
      <PaperCard className={classes.paper}>
        <AppbarContainer />
        <div className={classes.messageListSection}>
          <PaperCard>
            <MessageListContainer />
          </PaperCard>
        </div>
        <div className={classes.formSection}>
          <SendMesssageFormContainer />
        </div>
      </PaperCard>
    </Container>
  );
};

export default ChatRoomPage;
