import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../apis";

function* fetchUserSaga(action: any): any {
  const user = yield call(api.userByToken as any, action.payload);
  yield put(actions.getUserByToken.getUserByTokenSuccess(user.data));
}

function* watchGetUserByToken() {
  yield takeLatest(actions.getUserByToken.getUserByTokenRequest, fetchUserSaga);
}

export default watchGetUserByToken;
