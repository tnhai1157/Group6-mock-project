import { createActions } from "redux-actions";

export const getType = (reduxAction: any) => {
  return reduxAction().type;
};

export const updateUser = createActions({
  updateUserRequest: (payload) => payload,
  updateUserSuccess: (payload) => payload,
  updateUserFailure: (err) => err,
});
