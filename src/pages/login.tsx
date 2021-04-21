import { Container } from "@material-ui/core";
import { LoginContainer } from "../services/auth";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: "100vh",
  },
  loginSection: {
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
      <div className={classes.loginSection}>
        <LoginContainer />
      </div>
    </Container>
  );
};

export default LoginPage;
