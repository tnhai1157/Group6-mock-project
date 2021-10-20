import React from "react";
import FormLogin from "./components/FormSignIn";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SignIn() {
  // const history = useHistory();
  // const location = useLocation();
  // const user = useSelector((state: any) => state.user.data.user);
  // const auth = user;
  // const { from }: any = location.state || { from: { pathname: "/" } };
  // let login = () => {
  //   auth.signin(() => {
  //     history.replace(from);
  //   });
  // };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>
            <FormLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
