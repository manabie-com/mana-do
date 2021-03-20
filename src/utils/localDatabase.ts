import { Todo } from "../models/todo";
import { User } from "../models/user";

// FullUser Schema/Interface
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

// Simple LocalStorage Database (for the purpose of this front-end project only!)
// You shouldn't store large datas in local storage anyway.
export const ManaDo_DB: IManaDo_DB = {
  todos: [],
  // Preseted user for the application
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
