import { useForm } from "react-hook-form";
import { ISigninPayload } from "../../../third-party/firebase/services/auth";


export const useLoginContainer = () => {
  const { loginForm } = useLoginForm();

  return { loginForm };
};

const useLoginForm = () => {
  const loginForm = useForm<ISigninPayload>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return { loginForm };
};
