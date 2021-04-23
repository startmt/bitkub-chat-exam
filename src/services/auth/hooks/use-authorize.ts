import { useEffect, useMemo, useState } from "react";
import { firebaseServices } from "../../../third-party/firebase";
import firebase from "firebase";
import { useLoadingCallback } from "react-loading-hook";

export const useAuthorize = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [authState, setAuthState] = useState<
    "NOTREADY" | "AUTHORIZED" | "UNAUTHORIZED"
  >("NOTREADY");

  const handleService = async () =>
    await firebaseServices.authService.getUserDetail(handleUser);

  const handleUser = useMemo(
    () => (user: firebase.User | null) => {
      setUser(user);
      if (user) {
        setAuthState("AUTHORIZED");
      } else {
        setAuthState("UNAUTHORIZED");
      }
    },
    [user]
  );

  const [authorizeService, isAuthLoading] = useLoadingCallback(handleService);

  console.log(authState);
  useEffect(() => {
    authorizeService();
  }, []);

  return {
    user,
    isAuthLoading,
    authState,
  };
};
