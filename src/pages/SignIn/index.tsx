import React from "react";
import FormLogin from "./components/FormSignIn";
import { Link } from "react-router-dom";

export default function SignIn() {
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
