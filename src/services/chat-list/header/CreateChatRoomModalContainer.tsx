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
import { useCreateChatRoomModalContainer } from "./hook";

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
const CreateChatRoomModalContainer = () => {
  const classes = useStyles({});
  const {
    createChatRoomForm,
    isCreating,
    isOpen,
    handleCloseModal,
    handleOpenModal,
    onCreateRoom,
  } = useCreateChatRoomModalContainer();
  return (
    <>
      <Button onClick={handleOpenModal} variant="contained" color="primary">
        Create Chat Room
      </Button>
      <Dialog
        classes={{
          paper: classes.paper,
        }}
        open={isOpen}
        onClose={handleCloseModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Chat Room</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter you Room name</DialogContentText>
          <Input
            control={createChatRoomForm.control}
            name="name"
            rules={{
              required: {
                message: "Please enter your room name",
                value: true,
              },
            }}
            textFieldProps={{
              autoFocus: true,
              margin: "dense",
              label: "name",
              fullWidth: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isCreating}
            color="default"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button disabled={isCreating} onClick={onCreateRoom} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateChatRoomModalContainer;
