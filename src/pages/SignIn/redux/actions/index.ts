import { createActions } from "redux-actions";

export const getType = (reduxAction: any) => {
  return reduxAction().type;
};

export const getUser = createActions({
  getUserRequest: (payload) => payload,
  getUserSuccess: (payload) => payload,
  getUserFailure: (err) => err,
  deleteUser: undefined,
});
