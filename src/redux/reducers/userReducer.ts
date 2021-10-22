import { INIT_STATE } from "./../../constant";
import { getType, saveUserInStore } from "../actions";

export default function userReducer(state = INIT_STATE.user, action: any) {
  switch (action.type) {
    case getType(saveUserInStore.saveUserInStoreRequest): // case getUserRequest
      return {
        ...state,
        isLoading: true,
      };
    case getType(saveUserInStore.saveUserInStoreSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(saveUserInStore.saveUserInStoreFailure):
      return {
        ...state,
        isLoading: false,
      };

    case "DELETE_USER":
      return {
        ...state,
        isLoading: false,
        data: {},
      };

    default:
      return state;
  }
}
