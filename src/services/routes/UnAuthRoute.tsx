import { Skeleton } from "@material-ui/lab";
import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { usePrivateRoute } from "./hook";

interface IUnAuthRouteProps extends RouteProps {}

export const UnAuthRoute: React.FC<IUnAuthRouteProps> = (props) => {
  const { authState } = usePrivateRoute();
  switch (authState) {
    case "AUTHORIZED":
      return <Redirect to="/main" />;
    case "UNAUTHORIZED":
      return <Route exact {...props} />;
  }
  return <Skeleton />;
};
