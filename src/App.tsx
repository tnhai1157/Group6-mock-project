import React, { useEffect } from "react";
import "./App.css";
import CreateArticle from "./pages/CreateArticle";
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

function App() {
  const user = useSelector((state: any) => state.user.data.user);
  useEffect(() => {
    if (user) {
      window.localStorage.setItem("jwtToken", user.token);
    }
  }, [user]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <SignIn />
        </Route>
        <Route path="/register">
          <SignUp />
        </Route>
        <Route path="/editor">
          <Articles />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
