import {
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { PaperCard } from "../../../../components";
import { IChatListResponse } from "../../../../third-party/firebase/services/chat/interface";
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
});

interface IChatListItemProps {
  lastMessage: IChatListResponse["lastMessage"];
  name: string;
  id: string;
  onClick: (id: string) => void;
}
const ChatListItem: React.FC<IChatListItemProps> = (props) => {
  const { lastMessage, name, id, onClick } = props;
  const classes = useStyles({});

  const Secondary = (
    <div>
      <Typography className={classes.text}>
        {lastMessage && lastMessage.message}
      </Typography>
    </div>
  );
  return (
    <PaperCard className={classes.paper}>
      <ListItem onClick={() => onClick(id)} className={classes.listItem} button>
        <Typography color="textSecondary" className={classes.time}>
          {lastMessage && dayjs(lastMessage.time.toDate()).format("hh:mm a")}
        </Typography>
        <ListItemText
          className={classes.chatNameItem}
          primary={<Typography variant="h6">{name}</Typography>}
          secondary={Secondary}
        />
      </ListItem>
    </PaperCard>
  );
};

export default ChatListItem;
