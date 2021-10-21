import { getUserByToken } from "./../../../../redux/actions/index";
import { INIT_STATE } from "../../../../constant";
import { getUserSignUp } from "../../../SignUp/redux/actions";
import { getType, getUser } from "../actions";

export default function userReducer(state = INIT_STATE.user, action: any) {
  switch (action.type) {
    case getType(getUser.getUserRequest): // case getUserRequest
      return {
        ...state,
        isLoading: true,
      };
    case getType(getUser.getUserSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getUser.getUserFailure):
      return {
        ...state,
        isLoading: false,
      };

    case getType(getUser.deleteUser):
      return {
        ...state,
        isLoading: false,
        data: {},
      };

    case getType(getUserSignUp.getUserSignUpRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getUserSignUp.getUserSignUpSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getUserSignUp.getUserSignUpFailure):
      return {
        ...state,
        isLoading: false,
      };

    case getType(getUserByToken.getUserByTokenRequest):
      return {
        ...state,
        isLoading: true,
      };

    case getType(getUserByToken.getUserByTokenSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };

    case getType(getUserByToken.getUserByTokenFailure):
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
