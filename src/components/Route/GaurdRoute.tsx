import React from "react";
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ Component, auth, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) => (auth ? <Component /> : <Redirect to="/" exact />)}
  />
);

export default GuardedRoute;
