import { INIT_STATE } from "../../../../constant";
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

    default:
      return state;
  }
}
