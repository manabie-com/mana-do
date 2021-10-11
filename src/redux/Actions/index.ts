import { Loading } from "./../../models/common";
import { ACTION } from "./../contants/index";
export function loading(data: boolean): Loading {
  return {
    type: ACTION.LOADING,
    payload: data,
  };
}
export function accessToken(data: string): Loading {
  return {
    type: ACTION.ACCESS_TOKEN,
    payload: data,
  };
}
