import { MANADO_DB } from "../constants";
import { IManaDo_DB } from "../utils/localDatabase";
import Service from "../service";
import { TodoStatus } from "../models/todo";

const mockDB: IManaDo_DB = {
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
  ],
};

localStorage.setItem(MANADO_DB, JSON.stringify(mockDB));

// ------------------------------------------------------------

function resetDB() {
  localStorage.setItem(MANADO_DB, JSON.stringify(mockDB));
}

function fetchDB(): IManaDo_DB {
  return JSON.parse(localStorage.getItem(MANADO_DB) || "");
}

// ------------------------------------------------------------

test("Signin api", () => {
  const username = "firstUser";
  const password = "example";
  const expectedMocktoken = "testabc.xyz.ahk" + username;
  const expectedError = "Incorrect username/password";

  return Service.signIn(username, password)
    .then((response) => {
      expect(response).toBe(expectedMocktoken);
    })
    .catch((error) => {
      expect(error).toBe(expectedError);
    });
});

test("Get user api", () => {
  const token = "testabc.xyz.ahkfirstUser";
  const expectedError = "No user found!";

  return Service.getUser(token)
    .then((response) => {
      expect(response).toEqual({
        username: response.username,
        user_id: response.user_id,
      });
    })
    .catch((error) => {
      expect(error).toBe(expectedError);
    });
});

test("Create todo api", () => {
  resetDB();
  const todoContent = "Wireframe some screens";
  const userID = "firstUser";
  const expectedLength = fetchDB().todos.length + 1;

  return Service.createTodo(todoContent, userID).then((response) => {
    const database = fetchDB() as IManaDo_DB;
    expect(response).toEqual(database.todos[database.todos.length - 1]);
    expect(database.todos.length).toEqual(expectedLength);
  });
});

test("Get todos api", () => {
  resetDB();
  const userID = "firstUser";

  return Service.getTodos(userID).then((response) => {
    expect(response).toStrictEqual(mockDB.todos);
  });
});

test("Get todo api", () => {
  resetDB();
  const todoID = "RmrMgo8gH";

  return Service.getTodo(todoID).then((response) => {
    expect(response).toStrictEqual(mockDB.todos[0]);
  });
});

test("Update todo status api", () => {
  const todoID = "RmrMgo8gH";

  return Service.updateTodoStatus(todoID, true).then((response) => {
    expect(response).toBeTruthy();
  });
});

test("Update all todos status api", () => {
  const userID = "firstUser";

  return Service.updateAllTodoStatus(true, userID).then((response) => {
    expect(response).toBeTruthy();
  });
});

test("Update todo content api", () => {
  resetDB();
  const todoID = "RmrMgo8gH";
  const newExpectedContent = "Sweeping leafs";
  const expectedTodo = {
    content: newExpectedContent,
    created_date: "2021-03-22T09:21:46.595Z",
    id: todoID,
    status: TodoStatus.ACTIVE,
    user_id: "firstUser",
  };

  return Service.updateTodoContent(todoID, newExpectedContent).then(
    (response) => {
      expect(response).toEqual(expectedTodo);
    }
  );
});

test("Remove todo api", () => {
  resetDB();
  const todoID = "RmrMgo8gH";
  const expectedTodo = {
    content: "Clean the dishes",
    created_date: "2021-03-22T09:21:46.595Z",
    id: todoID,
    status: TodoStatus.ACTIVE,
    user_id: "firstUser",
  };
  const expectedLength = fetchDB().todos.length - 1;

  return Service.removeTodo(todoID).then((response) => {
    expect(response).toEqual(expectedTodo);
    expect(fetchDB().todos.length).toEqual(expectedLength);
  });
});

test("Remove all todos by type api", () => {
  const userID = "firstUser";
  const todoType = TodoStatus.ACTIVE;
  const expectedLength = 0;

  return Service.removeAllTodoByType(userID, todoType).then(() => {
    expect(
      fetchDB().todos.filter((todo) => todo.status === todoType).length
    ).toEqual(expectedLength);
  });
});

test("Remove all todos api", () => {
  const userID = "firstUser";
  const expectedLength = 0;

  return Service.removeAllTodo(userID).then(() => {
    expect(
      fetchDB().todos.filter((todo) => todo.user_id === userID).length
    ).toEqual(expectedLength);
  });
});
