import { Button, makeStyles, Typography } from "@material-ui/core";
import CreateChatRoomModalContainer from "./CreateChatRoomModalContainer";
import { useHeaderContainer } from "./hook";

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
    width: "40%",
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
  const { user } = useHeaderContainer();
  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h4">Chat Room ({user?.displayName})</Typography>
      </div>
      <div className={classes.buttonSection}>
        <div className={classes.marginButton}>
          <Button variant="contained" color="secondary">
            Join Room
          </Button>
        </div>
        <div className={classes.marginButton}>
          <CreateChatRoomModalContainer />
        </div>
        <Button color="default">
          <Typography className={classes.signoutText}>Sign out</Typography>
        </Button>
      </div>
    </div>
  );
};

export default ChatListContainer;
