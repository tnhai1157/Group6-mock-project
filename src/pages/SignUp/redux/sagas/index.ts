import { getUserSignUp } from "./../actions/index";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../../apis";

function* postUserSignUpSaga(action: any): any {
  const user = yield call(api.postUserSignUp as any, action.payload);
  yield put(getUserSignUp.getUserSignUpSuccess(user.data));
}

function* watchSignUpProcess() {
  yield takeLatest(getUserSignUp.getUserSignUpRequest, postUserSignUpSaga);
}

export default watchSignUpProcess;
