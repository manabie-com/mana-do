import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middleware = [thunk];

const mockStore = configureStore(middleware);
const createTodo = () => ({ type: "CREATE_TODO" });
const getTodoList = () => ({ type: "GET_TODO_LIST" });
const setTodo = () => ({ type: "SET_TODO_LIST" });
const deleteTodo = () => ({ type: "DELETE_TODO" });
const deleteAllTodo = () => ({ type: "DELETE_ALL_TODO_LIST" });
const toggleAllTodoList = () => ({ type: "TOGGLE_ALL_TODO_LIST" });
const updateTodo = () => ({ type: "UPDATE_TODO" });
const updateTodoStatus = () => ({ type: "UPDATE_TODO_STATUS" });
const updateTodoStatusContent = () => ({ type: "UPDATE_TODO_STATUS_CONTENT" });

it("should dispatch create todo actions", () => {
  const initialState = {};
  const store = mockStore(initialState);

  store.dispatch(createTodo());
  const actions = store.getActions();
  const expectedPayload = { type: "CREATE_TODO" };
  expect(actions).toEqual([expectedPayload]);
});

it("should dispatch get todo list actions", () => {
  const initialState = {};
  const store = mockStore(initialState);

  store.dispatch(getTodoList());
  const actions = store.getActions();
  const expectedPayload = { type: "GET_TODO_LIST" };
  expect(actions).toEqual([expectedPayload]);
});

it("should dispatch set todo actions", () => {
  const initialState = {};
  const store = mockStore(initialState);

  store.dispatch(setTodo());
  const actions = store.getActions();
  const expectedPayload = { type: "SET_TODO_LIST" };
  expect(actions).toEqual([expectedPayload]);
});

it("should dispatch delete todo actions", () => {
  const initialState = {};
  const store = mockStore(initialState);

  store.dispatch(deleteTodo());
  const actions = store.getActions();
  const expectedPayload = { type: "DELETE_TODO" };
  expect(actions).toEqual([expectedPayload]);
});
it("should dispatch delete all of todo list actions", () => {
  const initialState = {};
  const store = mockStore(initialState);

  store.dispatch(deleteAllTodo());
  const actions = store.getActions();
  const expectedPayload = { type: "DELETE_ALL_TODO_LIST" };
  expect(actions).toEqual([expectedPayload]);
});

it("should dispatch toggle all of todo list actions", () => {
  const initialState = {};
  const store = mockStore(initialState);

  store.dispatch(toggleAllTodoList());
  const actions = store.getActions();
  const expectedPayload = { type: "TOGGLE_ALL_TODO_LIST" };
  expect(actions).toEqual([expectedPayload]);
});

it("should dispatch update todo actions", () => {
  const initialState = {};
  const store = mockStore(initialState);

  store.dispatch(updateTodo());
  const actions = store.getActions();
  const expectedPayload = { type: "UPDATE_TODO" };
  expect(actions).toEqual([expectedPayload]);
});

it("should dispatch update todo status actions", () => {
  const initialState = {};
  const store = mockStore(initialState);

  store.dispatch(updateTodoStatus());
  const actions = store.getActions();
  const expectedPayload = { type: "UPDATE_TODO_STATUS" };
  expect(actions).toEqual([expectedPayload]);
});
it("should dispatch update todo content actions", () => {
  const initialState = {};
  const store = mockStore(initialState);

  store.dispatch(updateTodoStatusContent());
  const actions = store.getActions();
  const expectedPayload = { type: "UPDATE_TODO_STATUS_CONTENT" };
  expect(actions).toEqual([expectedPayload]);
});
