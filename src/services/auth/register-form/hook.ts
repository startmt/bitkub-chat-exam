import { useForm } from "react-hook-form";
import {
  dto,
  ICreateUserFireStorePayload,
  IRegisterPayload,
} from "../../../third-party/firebase/services/auth";
import { useLoadingCallback } from "react-loading-hook";
import { firebaseServices } from "../../../third-party/firebase";
import { LoadingCallback } from "react-loading-hook/lib/useLoadingCallback";
import { useHistory } from "react-router";
import { useSnackbar } from "notistack";
import { IResponseFailApi } from "../../../domains/IResponse";

export const useRegisterContainer = () => {
  const {
    isLoginError,
    isLoginLoading,
    registerService,
  } = useRegisterService();
  const { loginForm, handleRegister } = useLoginForm({ registerService });
  return { loginForm, isLoginLoading, isLoginError, handleRegister };
};

const useRegisterService = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const handleService = async (
    user: IRegisterPayload,
    userFirestore: ICreateUserFireStorePayload
  ) => {
    const res = await firebaseServices.authService.registerWithEmailAndPassword(
      user,
      userFirestore
    );
    if (res.isSuccess) {
      history.replace("/login");
      enqueueSnackbar("Register success", {
        variant: "success",
      });
      return;
    }
    const error = res as IResponseFailApi<any>;
    enqueueSnackbar(error.error.message as IResponseFailApi<any>, {
      variant: "error",
    });
  };

  const [registerService, isLoginLoading, isLoginError] = useLoadingCallback(
    handleService
  );
  return { registerService, isLoginLoading, isLoginError };
};

interface IRegisterForm extends IRegisterPayload {
  repassword: string;
  name: string;
}

interface userLoginFormProps {
  registerService: LoadingCallback<
    (
      user: IRegisterPayload,
      userFireStore: ICreateUserFireStorePayload
    ) => Promise<void>
  >;
}
const useLoginForm = (props: userLoginFormProps) => {
  const { registerService } = props;
  const loginForm = useForm<IRegisterForm>({
    defaultValues: {
      email: "",
      password: "",
      repassword: "",
      name: "",
    },
  });

  const handleRegister = loginForm.handleSubmit((value) => {
    const loginPayload = dto.mapToRegisterService({
      email: value.email,
      password: value.password,
    });
    const userFirestorePayload = dto.mapToCreateUserFirestoreService({
      email: value.email,
      name: value.name,
    });
    registerService(loginPayload, userFirestorePayload);
  });
  return { loginForm, handleRegister };
};
