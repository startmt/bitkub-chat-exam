import {
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { PaperCard } from "../../../../components";
import { IChatRoomResponse } from "../../../../third-party/firebase/services/chat/interface";
import dayjs from "dayjs";
const useStyles = makeStyles({
  paper: {
    marginBottom: 24,
    borderRadius: 8,
  },
  listItem: {
    padding: 24,
    flexDirection: "column",
    minHeight: 130,
  },
  inputWrapper: {
    marginTop: 16,
  },
  buttonWrapper: {
    marginTop: 16,
    textAlign: "right",
  },
  time: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
  },
  chatNameItem: {
    justifyContent: "flex-start",
    width: "100%",
  },
  text: {
    marginRight: 8,
  },
  secondary: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  primary: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
});

interface IChatListItemProps {
  lastMessage: IChatRoomResponse["lastMessage"];
  name: string;
  id: string;
  onClick: (id: string) => void;
}
const ChatListItem: React.FC<IChatListItemProps> = (props) => {
  const { lastMessage, name, id, onClick } = props;
  const classes = useStyles({});

  const Secondary = (
    <div className={classes.secondary}>
      <Typography className={classes.text}>
        {lastMessage && lastMessage.message}
      </Typography>
      <Typography color="textSecondary" className={classes.time}>
        {lastMessage && dayjs(lastMessage.time.toDate()).format("hh:mm a")}
      </Typography>
    </div>
  );
  return (
    <PaperCard className={classes.paper}>
      <ListItem onClick={() => onClick(id)} className={classes.listItem} button>
        <ListItemText
          className={classes.chatNameItem}
          primary={
            <div className={classes.primary}>
              <Typography variant="h6">{name}</Typography>
              <Typography color="textSecondary">{id}</Typography>
            </div>
          }
          secondary={Secondary}
        />
      </ListItem>
    </PaperCard>
  );
};

export default ChatListItem;
