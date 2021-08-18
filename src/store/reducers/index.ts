import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["todolist"],
};
const reducers = combineReducers({
  todolist: todoReducer,
});

export default persistReducer(persistConfig, reducers);
export type State = ReturnType<typeof reducers>;
