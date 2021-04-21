import { useAuthorize } from "../auth/hooks/use-authorize";

export const usePrivateRoute = () => {
  const { isAuthLoading, authState } = useAuthorize();
  return { isAuthLoading, authState };
};
