import { postUserSignUp } from "./../../../SignUp/apis/index";
import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../apis";

function* fetchUserSaga(action: any): any {
  try {
    const user = yield call(api.postUsersSignIn as any, action.payload);
    yield put(actions.getUser.getUserSuccess(user.data));
  } catch (error) {
    console.log(error);
    yield put(actions.getUser.getUserFailure(error));
  }
}

function* watchSignInProcess() {
  yield takeLatest(actions.getUser.getUserRequest, fetchUserSaga);
}

export default watchSignInProcess;
