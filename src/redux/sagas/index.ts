import { all } from "redux-saga/effects";
// import watchUpdateUserProcess from "../../pages/Settings/redux/sagas";
// import watchSignInProcess from "../../pages/SignIn/redux/sagas";
// import watchSignUpProcess from "../../pages/SignUp/redux/sagas";
// import watchGetUserByToken from "./watchGetUserByToken";

function* mySaga() {
  yield all([
    // fork(watchSignInProcess),
    // fork(watchSignUpProcess),
    // fork(watchUpdateUserProcess),
    // fork(watchGetUserByToken),
  ]);
}

export default mySaga;
