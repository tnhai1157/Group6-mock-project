import { getUserSignUp } from "./../actions/index";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../../apis";

function* postUserSignUpSaga(action: any): any {
  try {
    const user = yield call(api.postUserSignUp as any, action.payload);
    yield put(getUserSignUp.getUserSignUpSuccess(user.data));
  } catch (error) {
    console.log(error);
    yield put(getUserSignUp.getUserSignUpFailure(error));
  }
}

function* watchSignUpProcess() {
  yield takeLatest(getUserSignUp.getUserSignUpRequest, postUserSignUpSaga);
}

export default watchSignUpProcess;
