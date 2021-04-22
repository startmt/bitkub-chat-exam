import { useForm } from "react-hook-form";
import {
  dto,
  IRegisterPayload,
} from "../../../third-party/firebase/services/auth";
import { useLoadingCallback } from "react-loading-hook";
import { firebaseServices } from "../../../third-party/firebase";
import { LoadingCallback } from "react-loading-hook/lib/useLoadingCallback";
import { useHistory } from "react-router";
export const useRegisterContainer = () => {
  const { isLoginError, isLoginLoading, loginService } = useRegisterService();
  const { loginForm, handleRegister } = useLoginForm({ loginService });

  return { loginForm, isLoginLoading, isLoginError, handleRegister };
};

const useRegisterService = () => {
  const history = useHistory();
  const handleService = async (user: IRegisterPayload) => {
    const res = await firebaseServices.authService.registerWithEmailAndPassword(
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

interface IRegisterForm extends IRegisterPayload {
  repassword: string;
}

interface userLoginFormProps {
  loginService: LoadingCallback<(user: IRegisterPayload) => Promise<void>>;
}
const useLoginForm = (props: userLoginFormProps) => {
  const { loginService } = props;
  const loginForm = useForm<IRegisterForm>({
    defaultValues: {
      email: "",
      password: "",
      repassword: "",
    },
  });

  const handleRegister = loginForm.handleSubmit((value) => {
    const loginPayload = dto.mapToRegisterService({
      email: value.email,
      password: value.password,
    });
    loginService(loginPayload);
  });
  return { loginForm, handleRegister };
};
