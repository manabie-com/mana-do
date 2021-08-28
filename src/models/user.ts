import {Todo, TodoStatus} from './todo'

export type User = {
  password: string;
}
export type UserInfoState = {
  isLoggedIn: boolean,
  username: string
}