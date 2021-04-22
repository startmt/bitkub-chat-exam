import { useAuthorize } from "../hooks/use-authorize";

export const useHeaderContainer = () => {
  const { user } = useAuthorize();

  return { user };
};
