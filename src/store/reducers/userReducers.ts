import { SET_USER } from "../../constants";
import { UserActions } from "../actions/userActions";
import { UserType } from "../types/userType";

export default function reducers(
  state: UserType,
  action: UserActions
): UserType {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
