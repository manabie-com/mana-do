import { Todo } from "../types/types";
import { TO_DO_LIST_LS } from "./constants";

export const setToDoList = (data: string) => localStorage.setItem(TO_DO_LIST_LS, data);
export const getToDoList = () => JSON.parse(localStorage.getItem(TO_DO_LIST_LS) ?? '[]') as Todo[];