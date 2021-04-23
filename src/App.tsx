import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Skeleton } from "@material-ui/lab";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./utils/theme";
import { PrivateRoute } from "./services/routes";
import { createFirebaseConnection } from "./third-party/firebase";
import { SnackbarProvider } from "notistack";

const LoginPage = lazy(
  () => import(/* webpackChunkName: "LoginPage" */ "./pages/login")
);

const RegisterPage = lazy(
  () => import(/* webpackChunkName: "LoginPage" */ "./pages/register")
);

const ChatListPage = lazy(
  () => import(/* webpackChunkName: "LoginPage" */ "./pages/chat-list")
);

const ChatRoomPage = lazy(
  () => import(/* webpackChunkName: "LoginPage" */ "./pages/chat-room")
);

createFirebaseConnection();
function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <Suspense fallback={<Skeleton />}>
            <Switch>
              <PrivateRoute path="/main" component={ChatListPage} />
              <PrivateRoute path="/chat-room/:id" component={ChatRoomPage} />
            </Switch>
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
            </Switch>
          </Suspense>
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
