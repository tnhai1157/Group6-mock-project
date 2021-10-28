import React, { useEffect, useState } from "react";
import "./App.css";
import Editor from "./pages/Editor";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Articles from "./pages/Articles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "./pages/SignUp";
import GuardedRoute from "./components/Route/GaurdRoute";
import { saveUserInStore } from "./redux/actions";
import { userByToken } from "./apis";
import { RootState } from ".";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state?.user?.data);
  const [loginState, setLoginState] = useState<boolean>(false);
  const token = window.localStorage.getItem("jwtToken");

  useEffect(() => {
    if (token && !user?.username) {
      userByToken(token).then((res) => {
        const user = res.data.user;
        dispatch(saveUserInStore.saveUserInStoreSuccess(user));
      });
    }
  }, [token, user, dispatch]);

  useEffect(() => {
    const token = window.localStorage.getItem("jwtToken");
    if (token) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  }, [user]);

  return (
    <Router>
      <Header userToken={loginState} />
      <Switch>
        <Route exact path="/">
          <Home userToken={loginState} />
        </Route>
        <Route path="/login">
          <SignIn />
        </Route>
        <Route path="/register">
          <SignUp />
        </Route>
        <GuardedRoute
          path="/register"
          auth={!window.localStorage.getItem("jwtToken")}
          Component={Editor}
        ></GuardedRoute>
        <GuardedRoute
          exact
          path="/editor"
          auth={window.localStorage.getItem("jwtToken")}
          Component={Editor}
        ></GuardedRoute>
        <GuardedRoute
          path="/editor/:slug"
          auth={window.localStorage.getItem("jwtToken")}
          Component={Editor}
        ></GuardedRoute>
        <GuardedRoute
          path="/settings"
          auth={window.localStorage.getItem("jwtToken")}
          Component={Settings}
        ></GuardedRoute>
        <GuardedRoute
          path={`/profile/:slug`}
          auth={window.localStorage.getItem("jwtToken")}
          Component={Profile}
        ></GuardedRoute>
        <Route path="/article/:slug">
          <Articles />
        </Route>
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
