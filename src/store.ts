import { configureStore } from '@reduxjs/toolkit'
import signInReducer from './modules/signin/signin.slice';
import todoReducer from './modules/todo/todo.slice';

export default configureStore({
  reducer: {
    signIn: signInReducer,
    todo: todoReducer
  },
})