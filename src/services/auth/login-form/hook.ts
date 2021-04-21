import { useForm } from "react-hook-form";
import { ISigninPayload } from "../../../third-party/firebase/services/auth";
import { useLoadingCallback } from "react-loading-hook";
import { firebaseServices } from "../../../third-party/firebase";
import { LoadingCallback } from "react-loading-hook/lib/useLoadingCallback";
import { useHistory } from "react-router";
export const useLoginContainer = () => {
  const { isLoginError, isLoginLoading, loginService } = useLoginService();
  const { loginForm, handleLogin } = useLoginForm({ loginService });

  return { loginForm, isLoginLoading, isLoginError, handleLogin };
};

const useLoginService = () => {
  const history = useHistory();
  const handleService = async (user: ISigninPayload) => {
    const res = await firebaseServices.authService.signinWithEmailAndPassword(
      user
    );
    if (res.isSuccess) {
      history.replace("/main");
    }
  };

  const [loginService, isLoginLoading, isLoginError] = useLoadingCallback(
    handleService
  );
  return { loginService, isLoginLoading, isLoginError };
};

interface userLoginFormProps {
  loginService: LoadingCallback<(user: ISigninPayload) => Promise<void>>;
}
const useLoginForm = (props: userLoginFormProps) => {
  const { loginService } = props;
  const loginForm = useForm<ISigninPayload>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = loginForm.handleSubmit((value) => {
    loginService(value);
  });
  return { loginForm, handleLogin };
};
