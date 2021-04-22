import { Container } from "@material-ui/core";
import { RegisterContainer } from "../services/auth";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: "100vh",
  },
  registerSection: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

const LoginPage = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <div className={classes.registerSection}>
        <RegisterContainer />
      </div>
    </Container>
  );
};

export default LoginPage;
