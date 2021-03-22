import { TodoStatus } from "../models/todo";
import { IManaDo_DB } from "../utils/localDatabase";

export const mockDB: IManaDo_DB = {
  users: [
    {
      user_id: "firstUser",
      username: "firstUser",
      password: "example",
      token: "testabc.xyz.ahkfirstUser",
    },
  ],
  todos: [
    {
      content: "Clean the dishes",
      created_date: "2021-03-22T09:21:46.595Z",
      id: "RmrMgo8gH",
      status: TodoStatus.ACTIVE,
      user_id: "firstUser",
    },
    {
      content: "Washing clothes",
      created_date: "2021-03-22T09:21:46.595Z",
      id: "zxczxczxc",
      status: TodoStatus.ACTIVE,
      user_id: "firstUser",
    },
  ],
};
