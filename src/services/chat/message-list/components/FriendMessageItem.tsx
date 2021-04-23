import { ListItemText, makeStyles, Typography } from "@material-ui/core";
import { PaperCard } from "../../../../components";

const useStyles = makeStyles({
  list: {
    margin: 12,
  },
  textPrimary: {
    marginLeft: 12,
  },
  paper: {
    minWidth: 50,
    width: "fit-content",
    padding: 16,
    maxWidth: "60%",
    borderRadius: 8,
  },
  secondaryWrapper: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  message:{
    wordBreak: 'break-all'
  },
  timeWrapper: {
    marginBottom: 4,
    marginLeft: 8,
  },
});

interface IFriendMessageItemProps {
  name: string;
  message: string;
  sentTime: string;
}

const FriendMessageItem: React.FC<IFriendMessageItemProps> = (props) => {
  const { name, message, sentTime } = props;
  const classes = useStyles();
  return (
    <ListItemText
      className={classes.list}
      primary={<Typography className={classes.textPrimary}>{name}</Typography>}
      secondary={
        <div className={classes.secondaryWrapper}>
          <PaperCard className={classes.paper}>
            <Typography className={classes.message} component="span" variant="body1" color="textPrimary">
              {message}
            </Typography>
          </PaperCard>
          <Typography
            className={classes.timeWrapper}
            variant="body2"
            color="textSecondary"
          >
            {sentTime}
          </Typography>
        </div>
      }
    />
  );
};

export default FriendMessageItem;
