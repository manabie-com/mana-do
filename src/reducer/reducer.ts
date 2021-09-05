import { combineReducers } from "redux"
import { AppReducer } from "App/App.reducer"
import { loginReducer } from "pages/Login/Login.reducer"
import { todoReducer } from "pages/Todo/Todo.reducer"
const rootReducer = combineReducers({
  app: AppReducer,
  login: loginReducer,
  todo: todoReducer
})

export default rootReducer
