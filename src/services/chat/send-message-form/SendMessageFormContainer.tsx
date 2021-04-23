import { Divider, IconButton, makeStyles } from "@material-ui/core";
import { PaperCard } from "../../../components";
import { TextField } from "../../../components/form";
import SendIcon from "@material-ui/icons/Send";
import { useParams } from "react-router";
import { useSendMessageFormContainer } from "./hook";

const useStyles = makeStyles({
  paper: {
    display: "flex",
    paddingLeft: 8,
    paddingRight: 8,
  },
});

const SendMesssageFormContainer = () => {
  const params: any = useParams();
  const {
    sendMessageForm,
    isSending,
    onSendMessage,
  } = useSendMessageFormContainer({ id: params.id });
  const classes = useStyles();
  return (
    <form onSubmit={onSendMessage}>
      <Divider style={{ width: "100%" }} />
      <PaperCard className={classes.paper}>
        <TextField control={sendMessageForm.control} name="message" />
        <IconButton
          onClick={onSendMessage}
          disabled={isSending || !sendMessageForm.watch("message")}
          color="primary"
          aria-label="directions"
        >
          <SendIcon />
        </IconButton>
      </PaperCard>
    </form>
  );
};

export default SendMesssageFormContainer;
