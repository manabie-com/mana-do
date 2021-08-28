import { IAPI } from "./types";
import { Todo, TodoStatus } from "../models/todo";
import StorageController from "../utils/storage";
import { User } from "../models/user";

const mockToken = "testabc.xyz.ahk";

class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<User> {
    try {
      const userInfo: User = await StorageController.getInfo(
        username,
        password
      );
      StorageController.setCookieStorage(username);
      return Promise.resolve(userInfo);
    } catch (e) {
      return Promise.reject("Incorrect username/password");
    }
  }

  async createTodo(content: string, username: string): Promise<Todo> {
    try {
      let todo: Todo = await StorageController.addToDo(content, username);
      return Promise.resolve(todo);
    } catch (e) {
      return Promise.reject("Incorrect username/password");
    }
  }

  async getTodos(username: string): Promise<Todo[] | []> {
    return new Promise((resolve, reject) => {
      StorageController.getListTodo(username)
        .then((res) => {
          if(Array.isArray(res)) {
            return resolve(res);
          }else{
            return resolve([]);
          }
        })
        .catch((e) => {
          return reject([])
        });
    });
  }

  async deleteAllToDo(username: string): Promise<Todo[] | []> {
    return new Promise((resolve, reject) => {
      StorageController.deleteAllToDo(username)
        .then((res) => {
          return resolve([]);
        })
        .catch((e) => {
          return reject(e)
        });
    });
  }

  async updateListToDo(username: string, listToDo: Todo[]): Promise<Todo[] | []> {
    return new Promise((resolve, reject) => {
      StorageController.updateListToDo(username, listToDo)
        .then((res) => {
          return resolve([]);
        })
        .catch((e) => {
          return reject(e)
        });
    });
  }
}

export default new ApiFrontend();
