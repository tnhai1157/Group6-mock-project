import { createAction, createActions } from "redux-actions";

export const getType = (reduxAction: any) => {
  return reduxAction().type;
};

export const getUserByToken = createActions({
  getUserByTokenRequest: (payload) => payload,
  getUserByTokenSuccess: (payload) => payload,
  getUserByTokenFailure: (err) => err,
});

export const saveUserInStore = createActions({
  saveUserInStoreRequest: (payload) => payload,
  saveUserInStoreSuccess: (payload) => payload,
  saveUserInStoreFailure: (err) => err,
});

export const deleteUserInStore = createAction("DELETE_USER");
