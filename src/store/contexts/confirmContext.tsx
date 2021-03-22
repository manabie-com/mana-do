import React from "react";
import { ConfirmModalProps } from "../../_hooks/useConfirm/ConfirmModal";

// I kept action creators, reducer and context in one place because I still experiment this...

export interface ConfirmState {
  isShow: boolean;
  config: ConfirmModalProps;
}

// Actions ---------------------------------------------------

const SET_CONFIRM_PROP = "SET_CONFIRM_PROP";
const CLOSE_MODAL = "CLOSE_MODAL";
const SET_LOADING = "SET_LOADING";

export interface SetConfirmState {
  type: typeof SET_CONFIRM_PROP;
  payload: ConfirmModalProps;
}

export function setConfirmModalState(data: ConfirmModalProps): SetConfirmState {
  return {
    type: SET_CONFIRM_PROP,
    payload: data,
  };
}

// -------

export interface CloseModal {
  type: typeof CLOSE_MODAL;
  payload: boolean;
}

export function closeModal(): CloseModal {
  return {
    type: CLOSE_MODAL,
    payload: false,
  };
}

// -------

export interface SetLoading {
  type: typeof SET_LOADING;
  payload: boolean;
}

export function setLoading(flg: boolean): SetLoading {
  return {
    type: SET_LOADING,
    payload: flg,
  };
}

// -------

type ConfirmActions = SetConfirmState | CloseModal | SetLoading;

// Reducer ---------------------------------------------------

function reducer(state: ConfirmState, action: ConfirmActions): ConfirmState {
  switch (action.type) {
    case SET_CONFIRM_PROP:
      return {
        isShow: true,
        config: action.payload,
      };

    case CLOSE_MODAL:
      return {
        ...state,
        isShow: false,
      };

    case SET_LOADING:
      return {
        ...state,
        config: {
          ...state.config,
          isLoading: action.payload,
        },
      };

    default:
      return state;
  }
}
// Provider ---------------------------------------------------

const initialState = {
  isShow: false,
  config: { content: <p></p>, title: "", subLabel: "", onConfirm: () => {} },
} as ConfirmState;

export const ConfirmContext = React.createContext([{}, {}] as [
  ConfirmState,
  React.Dispatch<ConfirmActions>
]);

const ConfirmProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <ConfirmContext.Provider value={[state, dispatch]}>
      {children}
    </ConfirmContext.Provider>
  );
};

export default ConfirmProvider;
