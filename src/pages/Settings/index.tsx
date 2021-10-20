import React from "react";
import FormSettings from "./components/FormSettings";
import SignOut from "./components/SignOut";

export default function Settings() {
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <FormSettings />
            <SignOut />
          </div>
        </div>
      </div>
    </div>
  );
}
