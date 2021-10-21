import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../../apis";
import * as actions from "../actions";

function* fetchUserSaga(action: any): any {
  try {
    const user = yield call(api.updateUser as any, action.payload);
    yield put(actions.updateUser.updateUserSuccess(user.data));
  } catch (error) {
    yield put(actions.updateUser.updateUserFailure(error));
  }
}

function* watchUpdateUserProcess() {
  yield takeLatest(actions.updateUser.updateUserRequest, fetchUserSaga);
}

export default watchUpdateUserProcess;
