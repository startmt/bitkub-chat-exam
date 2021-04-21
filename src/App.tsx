import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Skeleton } from "@material-ui/lab";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./utils/theme";
import { PrivateRoute } from "./services/routes";
import { createFirebaseConnection } from "./third-party/firebase";

const LoginPage = lazy(
  () => import(/* webpackChunkName: "LoginPage" */ "./pages/login")
);

createFirebaseConnection();
function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Skeleton />}>
          <Switch>
            <PrivateRoute path="/main" component={LoginPage} />
          </Switch>
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </Suspense>
      </ThemeProvider>
    </Router>
  );
}

export default App;
