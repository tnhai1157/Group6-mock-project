import { all, fork } from "redux-saga/effects";
import watchSignInProcess from "../../pages/SignIn/redux/sagas";

function* mySaga() {
  yield all([fork(watchSignInProcess)]);
}

export default mySaga;
