import { IAPI } from "./types";
import shortid from "shortid";

import { Todo, TodoStatus } from "models/todo";
import { generateColor } from 'utils';

const mockToken = "testabc.xyz.ahk";
class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<Object> {
    if (username === "firstUser" && password === "example") {
      const loginTime = new Date().getTime();
      return Promise.resolve({
        token: mockToken,
        username: "firstUser",
        loginTime: loginTime,
      });
    }
    return Promise.reject({ code: 400, message: 'The username or password is incorrect. Please try again.' });
  }
  /*
    fake data api - save data to local storage
    add some new api : update, delete all
   */
  async createTodo(content: string): Promise<Todo> {
    try {
      const newTodo = {
        content: content,
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: "firstUser",
        color: generateColor()
      };
      return Promise.resolve(newTodo as Todo);
    } catch (error) {
      return Promise.reject({
        code: 500,
        message: "Some thing went wrong !"
      });
    }
  }

  async getTodoList(): Promise<Todo[]> {
    try {
       let todoList: any = localStorage.getItem("todoList") || "[]";
      todoList = JSON.parse(todoList);
      return Promise.resolve(todoList);
    } catch (error) {
       return Promise.reject({
        code: 500,
        message: "Some thing went wrong !"
      });
    }
  }
  async updateTodo(field: any, value: any, id: string): Promise<Todo> {
    try {
      // NOTE: fake data api - save to local storage
      let todoList: any = localStorage.getItem("todoList") || "[]";
      todoList = JSON.parse(todoList);
      const index = todoList.findIndex((todo: any) => todo.id === id);
      todoList[index][field] = value;
      localStorage.setItem("todoList", JSON.stringify(todoList));
      return Promise.resolve(todoList[index] as Todo);
    } catch (error) {
       return Promise.reject({
        code: 500,
        message: "Some thing went wrong !"
      });
    }
  }
  async deleteTodo(id: string): Promise<Todo[]> {
     try {
       // NOTE: fake data api - save to local storage
      let todoList: any = localStorage.getItem("todoList") || "[]";
      todoList = JSON.parse(todoList);
      const index = todoList.findIndex((todo: any) => todo.id === id);
      if (index > -1) {
        todoList.splice(index, 1);
      }
      localStorage.setItem("todoList", JSON.stringify(todoList));
      return Promise.resolve(todoList);
    } catch (error) {
       return Promise.reject({
        code: 500,
        message: "Some thing went wrong !"
      });
    }
  }
 
  async deleteAllTodo(): Promise<String> {
     try {
       // NOTE: fake data api - save to local storage
      let todoList: any = [];
      localStorage.setItem("todoList", JSON.stringify(todoList));
      return Promise.resolve("Delete Success");
    } catch (error) {
       return Promise.reject({
        code: 500,
        message: "Some thing went wrong !"
      });
    }
    
  }
  async updateAllTodo(status: Boolean): Promise<String> {
    try {
      // NOTE: fake data api - save to local storage
      let todoList: any = localStorage.getItem("todoList") || "[]";
      todoList = JSON.parse(todoList);
      todoList = todoList.map((v: Todo) => {
          v.status = status ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
          return v;
      })
      localStorage.setItem("todoList", JSON.stringify(todoList));
      return Promise.resolve("Updated");
    } catch (error) {
       return Promise.reject({
        code: 500,
        message: "Some thing went wrong !"
      });
    }
  }
}

export default new ApiFrontend();
