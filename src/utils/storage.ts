import { APP_ACCESS_TOKEN } from "constants/const";

export const updateTokenLocalStorage = (token: string) => {
  localStorage.setItem(APP_ACCESS_TOKEN, token);
};

export const getTokenLocalStorage = (): string => {
  return localStorage.getItem(APP_ACCESS_TOKEN) || "";
};

export const removeTokenLocalStorage = () => {
  localStorage.removeItem(APP_ACCESS_TOKEN);
};
