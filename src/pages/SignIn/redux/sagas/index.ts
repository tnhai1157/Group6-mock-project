import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../apis";

function* fetchUserSaga(action: any): any {
  const user = yield call(api.postUsersLogin as any, action.payload);
  yield put(actions.getUser.getUserSuccess(user.data));
}

function* watchSignInProcess() {
  yield takeLatest(actions.getUser.getUserRequest, fetchUserSaga);
}

export default watchSignInProcess;
