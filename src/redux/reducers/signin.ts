import { Loading } from "./../../models/common";
import { ACTION } from "./../contants/index";
export interface PropsState {
  loading: boolean;
  accessToken: string;
}
const initialState = {
  loading: false,
  accessToken: ""
};
var login = (state: PropsState = initialState, action: Loading): PropsState => {
  switch (action.type) {
    case ACTION.LOADING: {
      const object = {...state}
      object.loading = action.payload
      return {...object};
    }
    case ACTION.ACCESS_TOKEN: {
      const object = {...state}
      object.accessToken = action.payload
      return {...object};
    }
    default:
      return state;
  }
};
export default login;
