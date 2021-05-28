import React from 'react';
import { AppState } from "../models/app";

interface CTodoContext {
  store: AppState,
  dispatch: Function
}


export const TodoContext = React.createContext({} as CTodoContext)
