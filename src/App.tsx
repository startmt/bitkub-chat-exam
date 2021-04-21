import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Skeleton } from "@material-ui/lab";
const LoginPage = lazy(
  () => import(/* webpackChunkName: "LoginPage" */ "./pages/login")
);
function App() {
  return (
    <Router>
      <Suspense fallback={<Skeleton />}>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
