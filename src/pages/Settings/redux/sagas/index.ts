import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../../apis";
import * as actions from "../actions";

function* fetchUserSaga(action: any): any {
  const user = yield call(api.updateUser as any, action.payload);
  console.log(user);
  yield put(actions.updateUser.updateUserSuccess(user.data));
}

function* watchUpdateUserProcess() {
  yield takeLatest(actions.updateUser.updateUserRequest, fetchUserSaga);
}

export default watchUpdateUserProcess;
