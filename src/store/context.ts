import React from "react";
import { AppState, initialState } from "./reducer";

const TodoContext = React.createContext<{
    state: AppState;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
});

export { TodoContext };