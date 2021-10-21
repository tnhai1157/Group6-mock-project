import { createActions } from "redux-actions";

export const getType = (reduxAction: any) => {
  return reduxAction().type;
};

export const getUserByToken = createActions({
  getUserByTokenRequest: (payload) => payload,
  getUserByTokenSuccess: (payload) => payload,
  getUserByTokenFailure: (err) => err,
});
