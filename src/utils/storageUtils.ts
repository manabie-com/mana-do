import { initialState } from "../store/reducer";

export const storeLoginToken = (token: string) => localStorage.setItem("token", token);

export const removeLoginToken = () => localStorage.removeItem("token");

export const getTokenStorage = () => localStorage.getItem("token");

export const storeReducerStorage = (data: object) => localStorage.setItem("reducerLocalStorage", JSON.stringify(data));

export const getReducerFromStorage = () => localStorage.getItem("reducerLocalStorage");

export const getTodosFromStorage = () => {
  const reducer = getReducerFromStorage();
  if (reducer) {
    const { todos } = JSON.parse(reducer);

    return todos;
  }

  return [];
};

export const initializerState = (initialValue = initialState) => {
  const localReducerData = getReducerFromStorage();
  if (localReducerData) {
    return JSON.parse(localReducerData);
  }
  storeReducerStorage(initialValue);
  return initialValue;
};
