import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { PaperCard } from "../../../components";

const useStyles = makeStyles({
  paper: {
    padding: 32,
    width: "100%",
  },
});
const LoginContainer = () => {
  const classes = useStyles({});
  return (
    <PaperCard className={classes.paper}>
      <div>
        <TextField variant="outlined" />
      </div>
      <TextField variant="outlined" />
    </PaperCard>
  );
};

export default LoginContainer;
