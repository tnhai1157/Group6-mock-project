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
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import SignUp from "./pages/SignUp";
import GuardedRoute from "./components/Route/GaurdRoute";

function App() {
  const user = useSelector((state: any) => state.user.data.user);
  console.log(user);
  const [loginState, setLoginState] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem("jwtToken", user.token);
    }
    const userToken = window.localStorage.getItem("jwtToken");
    if (userToken) {
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
          path="/editor"
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
        <GuardedRoute
          path="/article"
          auth={window.localStorage.getItem("jwtToken")}
          Component={Articles}
        ></GuardedRoute>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
