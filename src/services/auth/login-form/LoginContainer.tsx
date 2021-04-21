import { Button, makeStyles } from "@material-ui/core";
import { PaperCard } from "../../../components";
import { Input } from "../../../components/form";
import { useLoginContainer } from "./hook";
const useStyles = makeStyles({
  paper: {
    padding: 32,
    width: "100%",
    maxWidth: 600,
  },
  inputWrapper: {
    marginTop: 16,
  },
  buttonWrapper: {
    marginTop: 16,
    textAlign: "right",
  },
});
const LoginContainer = () => {
  const classes = useStyles({});
  const { loginForm, handleLogin } = useLoginContainer();
  return (
    <PaperCard className={classes.paper}>
      <div className={classes.inputWrapper}>
        <Input
          control={loginForm.control}
          name="email"
          rules={{
            required: {
              message: "กรุณากรอก Email",
              value: true,
            },
          }}
          textFieldProps={{
            variant: "outlined",
            label: "Email",
            error: !!loginForm.formState.errors.email,
            helperText: loginForm.formState.errors.email?.message,
          }}
        />
      </div>
      <div className={classes.inputWrapper}>
        <Input
          control={loginForm.control}
          name="password"
          rules={{
            required: {
              message: "กรุณากรอก Password",
              value: true,
            },
          }}
          textFieldProps={{
            variant: "outlined",
            label: "Password",
            error: !!loginForm.formState.errors.password,
            helperText: loginForm.formState.errors.password?.message,
          }}
        />
      </div>
      <div className={classes.buttonWrapper}>
        <Button onClick={handleLogin} variant="contained" color="primary">
          Login
        </Button>
      </div>
    </PaperCard>
  );
};

export default LoginContainer;
