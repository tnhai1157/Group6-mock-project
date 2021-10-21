import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { deleteUserInStore } from "../../../../redux/actions";
// import { getUser } from "../../../SignIn/redux/actions";

export default function SignOut() {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    window.localStorage.removeItem("jwtToken");
    dispatch(deleteUserInStore());
    history.push("/");
  };

  return (
    <div>
      <hr />
      <button
        className="btn btn-outline-danger"
        ng-click="$ctrl.logout()"
        onClick={handleSignOut}
      >
        Or click here to logout.
      </button>
    </div>
  );
}
