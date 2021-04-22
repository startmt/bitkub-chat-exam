import { Button, makeStyles, Typography } from "@material-ui/core";
import { PaperCard } from "../../../components";
import { Input } from "../../../components/form";
import { useRegisterContainer } from "./hook";
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
const RegisterContainer = () => {
  const classes = useStyles({});
  const { loginForm, handleRegister } = useRegisterContainer();
  return (
    <PaperCard className={classes.paper}>
      <Typography variant="h5">Register </Typography>
      <div className={classes.inputWrapper}>
        <Input
          control={loginForm.control}
          name="email"
          rules={{
            required: {
              message: "Please enter your e-mail",
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
              message: "Please enter your password.",
              value: true,
            },
            validate: (value) =>
              value === loginForm.watch("repassword") ||
              "Please sign password same re-password",
          }}
          textFieldProps={{
            variant: "outlined",
            label: "Password",
            error: !!loginForm.formState.errors.password,
            helperText: loginForm.formState.errors.password?.message,
            type: "password",
          }}
        />
      </div>
      <div className={classes.inputWrapper}>
        <Input
          control={loginForm.control}
          name="repassword"
          rules={{
            required: {
              message: "Please enter your password again.",
              value: true,
            },
            validate: (value) => value === loginForm.watch("password"),
          }}
          textFieldProps={{
            variant: "outlined",
            label: "Re-Password",
            error: !!loginForm.formState.errors.repassword,
            helperText: loginForm.formState.errors.repassword?.message,
            type: "password",
          }}
        />
      </div>
      <div className={classes.buttonWrapper}>
        <Button onClick={handleRegister} variant="contained" color="primary">
          Register
        </Button>
      </div>
    </PaperCard>
  );
};

export default RegisterContainer;
