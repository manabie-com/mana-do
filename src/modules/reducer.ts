import Actions, { types } from "./actions";

export interface GlobalState {
  isLogined: boolean;
}

const initialState: GlobalState = {
  isLogined: localStorage.getItem('token') !== "",
};

const globalReducer = (state = initialState, action: Actions): GlobalState => {
  const newState = { ...state };

  switch (action.type) {
    case types.LOGIN:
      newState.isLogined = true;
      localStorage.setItem("token", action.payload);
      return newState;
    case types.LOGOUT:
      newState.isLogined = false;
      localStorage.removeItem("token");
      return newState;
    default:
      return state;
  }
};

export default globalReducer;
