import { Container, createStyles, makeStyles } from "@material-ui/core";
import { PaperCard } from "../components";
import { HeaderContainer, ChatListContainer } from "../services/chat-list";

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
  })
);

const ChatListPage = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <PaperCard className={classes.paper}>
        <HeaderContainer />
        <ChatListContainer />
      </PaperCard>
    </Container>
  );
};

export default ChatListPage;
