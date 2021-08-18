import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";
import { persistStore } from "redux-persist";

//create a store for hold app

export const store = createStore(reducers, {}, applyMiddleware(thunk));
export const persisor = persistStore(store);
