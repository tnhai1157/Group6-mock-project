import React, { useEffect, useRef, useState } from "react";
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
import { getUserByToken, saveUserInStore } from "./redux/actions";
import { userByToken } from "./apis";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.data.user);
  const [loginState, setLoginState] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem("jwtToken", user.token);
    }
    const userToken = window.localStorage.getItem("jwtToken");

    if (userToken) {
      setLoginState(true);
      userByToken(userToken).then((res: any) => {
        const user = res.data.user;
        dispatch(saveUserInStore.saveUserInStoreSuccess(user));
      });
    } else {
      setLoginState(false);
    }
  }, [user, dispatch]);

  // let token = window.localStorage.getItem("jwtToken");
  // console.log({ token });

  // useEffect(() => {
  //   if (token) {
  //     userByToken(token).then((res: any) => {
  //       const user = res.data.user;
  //       dispatch(saveUserInStore.saveUserInStoreSuccess(user));
  //     });
  //     setLoginState(true);
  //   } else {
  //     setLoginState(false);
  //   }
  // }, [token, dispatch]);

  // useEffect(() => {
  //   if (user) {
  //     window.localStorage.setItem("jwtToken", user.token);
  //   }
  //   token = window.localStorage.getItem("jwtToken");
  // }, [user]);

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
          path="/profile"
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
