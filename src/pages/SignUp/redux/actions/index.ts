import { createActions } from "redux-actions";

export const getType = (reduxAction: any) => {
  return reduxAction().type;
};

export const getUserSignUp = createActions({
  getUserSignUpRequest: (payload) => payload,
  getUserSignUpSuccess: (payload) => payload,
  getUserSignUpFailure: (err) => err,
});
