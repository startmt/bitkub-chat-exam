import { firebaseServices } from "../../../third-party/firebase";
import { useLoadingCallback } from "react-loading-hook";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";

export const useSignout = () => {
  const { enqueueSnackbar } = useSnackbar();
  const h = useHistory();
  const handleService = async () => {
    const res = await firebaseServices.authService.signout();
    if (res.isSuccess) {
      enqueueSnackbar("Signout Success.", {
        variant: "success",
      });
      h.push("/login");
    } else {
      enqueueSnackbar("Signout Failed.", {
        variant: "error",
      });
    }
  };

  const [signout, isSignoutLoading] = useLoadingCallback(handleService);

  return {
    isSignoutLoading,
    signout,
  };
};
