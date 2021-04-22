import { Button, makeStyles, Typography } from "@material-ui/core";
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
  inputWrapper: {
    marginTop: 16,
  },
  buttonWrapper: {
    marginTop: 16,
    textAlign: "right",
  },
  marginButton: {
    marginRight: 16,
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
      <div>
        <Button
          className={classes.marginButton}
          variant="contained"
          color="primary"
        >
          Create Chat Room
        </Button>
        <Button variant="contained" color="secondary">
          Join Room
        </Button>
      </div>
    </div>
  );
};

export default ChatListContainer;
