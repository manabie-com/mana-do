import { createContext, useContext } from 'react';
import {AppState, initialState} from "./store/reducer";

export type GlobalContextType = {
  state: AppState
  dispatch: Function
}

export const useAppContext = () => useContext<GlobalContextType>(AppContext);

// @ts-ignore
const AppContext = createContext<GlobalContextType>(initialState);

export default AppContext;
