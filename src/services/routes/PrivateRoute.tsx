import { Skeleton } from "@material-ui/lab";
import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { usePrivateRoute } from "./hook";

interface IPrivateRoute extends RouteProps {}

export const PrivateRoute: React.FC<IPrivateRoute> = (props) => {
  const { authState } = usePrivateRoute();
  switch (authState) {
    case "AUTHORIZED":
      return <Route exact {...props} />;
    case "UNAUTHORIZED":
      return <Redirect to="/login" />;
  }
  return <Skeleton />;
};
