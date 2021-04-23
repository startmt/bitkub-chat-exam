import { ListItemText, makeStyles, Typography } from "@material-ui/core";
import { PaperCard } from "../../../../components";

const useStyles = makeStyles({
  list: {
    margin: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  textPrimary: {
    marginLeft: 12,
  },
  paper: {
    minWidth: 50,
    width: "fit-content",
    padding: 16,
    borderRadius: 8,
    maxWidth: "60%",
    background: "rgb(0, 153, 255)",
  },
  secondaryWrapper: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  message: {
    wordBreak: "break-all",
  },
  timeWrapper: {
    marginBottom: 4,
    marginRight: 8,
  },
});

interface IFriendMessageItemProps {
  name: string;
  message: string;
  sentTime: string;
}

const UserMessageItem: React.FC<IFriendMessageItemProps> = (props) => {
  const { name, message, sentTime } = props;
  const classes = useStyles();
  return (
    <ListItemText
      className={classes.list}
      primary={<Typography className={classes.textPrimary}>{name}</Typography>}
      secondary={
        <div className={classes.secondaryWrapper}>
          <Typography
            className={classes.timeWrapper}
            variant="body2"
            color="textSecondary"
          >
            {sentTime}
          </Typography>
          <PaperCard className={classes.paper}>
            <Typography
              className={classes.message}
              component="span"
              variant="body1"
              color="textPrimary"
            >
              {message}
            </Typography>
          </PaperCard>
        </div>
      }
    />
  );
};

export default UserMessageItem;
