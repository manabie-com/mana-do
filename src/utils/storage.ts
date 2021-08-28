import {User} from "../models/user";
import {Todo, TodoStatus} from "../models/todo";
import shortid from "shortid";

class StorageController {
  async getInfo(username: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const storageInfo: string | null = localStorage.getItem(username);
      if (storageInfo) {
        const userInfo: User = JSON.parse(storageInfo);
        if (userInfo.password === password) {
          return resolve(userInfo);
        } else {
          return reject(new Error("Password is incorrect"));
        }
      } else {
        const userInfo: User = {
          password: password,
        };
        localStorage.setItem(username, JSON.stringify(userInfo));
        return resolve(userInfo);
      }
    });
  }

  async addToDo(content: string, username: string): Promise<Todo> {
    return new Promise((resolve, reject) => {
      const storageInfo: string | null = localStorage.getItem(username);
      if (storageInfo) {
        try {
          const newToDo: Todo = {
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: username,
          };
          const currentToDoList: string | null = localStorage.getItem(
            `${username}__todo`
          );
          if (currentToDoList) {
            const listTodoObj = JSON.parse(currentToDoList);
            let listTodo: Todo[] = listTodoObj.listTodo;
            listTodo.push(newToDo);
            localStorage.setItem(
              `${username}__todo`,
              JSON.stringify({listTodo: listTodo})
            );
          } else {
            localStorage.setItem(
              `${username}__todo`,
              JSON.stringify({listTodo: []})
            );
          }
          return resolve(newToDo);
        } catch (e) {
          return reject(e);
        }
      } else {
        reject(new Error("User is not found"));
      }
    });
  }

  async getListTodo(username: string): Promise<Todo[] | []> {
    return new Promise((resolve, reject) => {
      const currentToDoList: string | null = localStorage.getItem(
        `${username}__todo`
      );
      if (currentToDoList) {
        try {
          const listTodoObj = JSON.parse(currentToDoList);
          const listTodo: Todo[] = listTodoObj.listTodo;
          if (Array.isArray(listTodo)) {
            return resolve(listTodo);
          } else {
            return resolve([]);
          }
        } catch (e) {
          return resolve([]);
        }
      } else {
        return resolve([]);
      }
    });
  }

  setCookieStorage(username: string) {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 2);
    let timeStamp = currentDate.getTime();
    localStorage.setItem(
      `currentSession`,
      JSON.stringify({username, expiration: timeStamp})
    );
  }

  getCookieStorage() {
    let item: string | null = localStorage.getItem(`currentSession`);
    if (item) {
      let currentSession = JSON.parse(item);
      return currentSession;
    } else return null
  }

  removeCookieStorage() {
    localStorage.removeItem('currentSession');
  }

  deleteAllToDo(username: string) {
    return new Promise(((resolve, reject) => {
      if(username){
        localStorage.removeItem(`${username}__todo`)
        return resolve([])
      }else reject([]);
    }))
  }

  updateListToDo(username:string, listTodo: Todo[]){
    return new Promise(((resolve, reject) => {
      if(username){
        localStorage.setItem(`${username}__todo`,JSON.stringify({listTodo: listTodo}))
        return resolve([])
      }else reject([]);
    }))
  }

}

const storageControllerIns = new StorageController();
export default storageControllerIns;
