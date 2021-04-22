import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { PaperCard } from "../../../components";
import { useLoginContainer } from "./hook";

const useStyles = makeStyles({
  paper: {
    marginBottom: 24,
  },
  listItem: {
    padding: 32,
  },
  inputWrapper: {
    marginTop: 16,
  },
  buttonWrapper: {
    marginTop: 16,
    textAlign: "right",
  },
});
const ChatListContainer = () => {
  const classes = useStyles({});
  const { loginForm, handleLogin } = useLoginContainer();
  return (
    <List>
      <PaperCard className={classes.paper}>
        <ListItem className={classes.listItem} button>
          <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
      </PaperCard>
      <PaperCard className={classes.paper}>
        <ListItem className={classes.listItem} button>
          <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
      </PaperCard>
      <PaperCard className={classes.paper}>
        <ListItem className={classes.listItem} button>
          <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
      </PaperCard>
    </List>
  );
};

export default ChatListContainer;
