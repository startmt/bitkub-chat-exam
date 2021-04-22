import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { Input } from "../../../components/form";
import {
  useCreateChatRoomModalContainer,
  useJoinChatRoomModalContainer,
} from "./hook";

const useStyles = makeStyles({
  paper: {
    minWidth: 350,
  },
  buttonWrapper: {
    marginTop: 16,
    textAlign: "right",
  },
  marginButton: {
    marginRight: 16,
  },
});
const JoinChatRoomModalContainer = () => {
  const classes = useStyles({});
  const {
    joinChatRoomForm,
    isJoining,
    isOpen,
    handleCloseModal,
    handleOpenModal,
    onJoinRoom,
  } = useJoinChatRoomModalContainer();
  return (
    <>
      <Button onClick={handleOpenModal} variant="contained" color="secondary">
        Join Room
      </Button>
      <Dialog
        classes={{
          paper: classes.paper,
        }}
        open={isOpen}
        onClose={handleCloseModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Join Chat Room</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter you ID rom</DialogContentText>
          <Input
            control={joinChatRoomForm.control}
            name="id"
            rules={{
              required: {
                message: "Please enter your room ID",
                value: true,
              },
            }}
            textFieldProps={{
              autoFocus: true,
              margin: "dense",
              label: "Room ID",
              fullWidth: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isJoining}
            color="default"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button disabled={isJoining} onClick={onJoinRoom} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JoinChatRoomModalContainer;
