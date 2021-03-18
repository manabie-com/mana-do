import { Todo, TodoStatus } from "../models/todo";
import { User } from "../models/user";

export interface FullUser extends User {
  user_id: string;
  username: string;
  token: string;
  password: string;
}

export interface IManaDo_DB {
  todos: Array<Todo>;
  users: Array<FullUser>;
}

export const ManaDo_DB: IManaDo_DB = {
  todos: [],
  users: [
    {
      user_id: "firstUser",
      username: "firstUser",
      password: "example",
      token: "testabc.xyz.ahkfirstUser",
    },
    {
      user_id: "admin",
      username: "admin",
      password: "123",
      token: "testabc.xyz.ahkadmin",
    },
  ],
};
