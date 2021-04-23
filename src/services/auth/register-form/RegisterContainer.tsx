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
      <form onSubmit={handleRegister}>
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
            name="name"
            rules={{
              required: {
                message: "Please enter your display name",
                value: true,
              },
            }}
            textFieldProps={{
              variant: "outlined",
              label: "name",
              error: !!loginForm.formState.errors.name,
              helperText: loginForm.formState.errors.name?.message,
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
              minLength: {
                message: "Please enter your password 1-6 character",
                value: 6,
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
          <Button
            onClick={handleRegister}
            typeof="submit"
            type="submit"
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </div>
      </form>
    </PaperCard>
  );
};

export default RegisterContainer;
