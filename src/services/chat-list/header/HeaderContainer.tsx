import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CreateChatRoomModalContainer from "./CreateChatRoomModalContainer";
import { useHeaderContainer } from "./hook";
import JoinChatRoomModalContainer from "./JoinChatRoomModalContainer";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 24,
    marginBottom: 24,
  },
  buttonSection: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  buttonWrapper: {
    marginTop: 16,
    textAlign: "right",
  },
  marginButton: {
    marginRight: 16,
  },
  signoutText: {
    color: "red",
  },
});
const ChatListContainer = () => {
  const classes = useStyles({});
  const { user, signout } = useHeaderContainer();
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Chat Room ({user?.displayName})
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <div className={classes.buttonSection}>
          <div className={classes.marginButton}>
            <JoinChatRoomModalContainer />
          </div>
          <div className={classes.marginButton}>
            <CreateChatRoomModalContainer />
          </div>
          <Button onClick={signout} color="default">
            <Typography className={classes.signoutText}>Sign out</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatListContainer;
