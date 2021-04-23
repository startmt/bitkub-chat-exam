import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { useParams } from "react-router";
import { useAppbarContainer } from "./hook";

const Appbar = () => {
  const params: any = useParams();
  const { chatRoom } = useAppbarContainer(params.id);
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
          {chatRoom && chatRoom.roomName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(Appbar);
