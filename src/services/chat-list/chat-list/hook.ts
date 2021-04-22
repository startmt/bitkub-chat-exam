import { useAuthorize } from "../../auth/hooks/use-authorize";
export const useLoginContainer = () => {
  const { user } = useAuthorize();

  return { user };
};
