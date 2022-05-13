import shortid from 'shortid';
import { Todo, TodoStatus } from '../../models/todo';

import reducer, { initialState } from '../../store/reducer';
import {
  createTodo,
  deleteTodos,
  setTodos,
  updateTodoContent,
  updateTodoStatus,
} from '../../store/actions';
import { KEY_TODOS } from '../../utils';

const todo1: Todo = {
  id: shortid(),
  content: 'Task 1',
  createdDate: new Date().toISOString(),
  status: TodoStatus.NEW,
  userId: 'firstUser',
};

const todo2: Todo = {
  id: shortid(),
  content: 'Task 2',
  createdDate: new Date().toISOString(),
  status: TodoStatus.NEW,
  userId: 'secondUser',
};

const todo3: Todo = {
  id: shortid(),
  content: 'Task 3',
  createdDate: new Date().toISOString(),
  status: TodoStatus.NEW,
  userId: 'thirdUser',
};

describe('reducer test', () => {
  describe('SET_TODOS', () => {
    test('should set todos', () => {
      const nextState = reducer(initialState, setTodos([todo1, todo2]));
      expect(nextState.todos.length).toEqual(2);
    });
  });
  describe('CREATE_TODO', () => {
    test('should create new todo', () => {
      const nextState = reducer(initialState, createTodo(todo1));
      expect(nextState.todos.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenLastCalledWith(
        KEY_TODOS,
        JSON.stringify(nextState.todos)
      );
      expect(localStorage.__STORE__[KEY_TODOS]).toBe(JSON.stringify([todo1]));
    });
  });

  describe('UPDATE_TODO_STATUS', () => {
    test('should update todo 1 to ACTIVE', () => {
      initialState.todos = [todo1];
      const nextState = reducer(
        initialState,
        updateTodoStatus([todo1.id], TodoStatus.ACTIVE)
      );
      expect(nextState.todos.find((x) => x.id === todo1.id)?.status).toEqual(
        TodoStatus.ACTIVE
      );
      expect(localStorage.setItem).toHaveBeenLastCalledWith(
        KEY_TODOS,
        JSON.stringify(nextState.todos)
      );
      expect(localStorage.__STORE__[KEY_TODOS]).toBe(
        JSON.stringify([{ ...todo1, status: TodoStatus.ACTIVE }])
      );
    });
  });

  describe('UPDATE_TODO_STATUS', () => {
    test('should update todo 1 to COMPLETED', () => {
      const nextState = reducer(
        initialState,
        updateTodoStatus([todo1.id], TodoStatus.COMPLETED)
      );
      expect(nextState.todos.find((x) => x.id === todo1.id)?.status).toEqual(
        TodoStatus.COMPLETED
      );
      expect(localStorage.setItem).toHaveBeenLastCalledWith(
        KEY_TODOS,
        JSON.stringify(nextState.todos)
      );
      expect(localStorage.__STORE__[KEY_TODOS]).toBe(
        JSON.stringify([{ ...todo1, status: TodoStatus.COMPLETED }])
      );
    });
  });

  describe('UPDATE_TODO_STATUS', () => {
    test('should update todo 1 back to DOING', () => {
      const nextState = reducer(
        initialState,
        updateTodoStatus([todo1.id], TodoStatus.NEW)
      );
      expect(nextState.todos.find((x) => x.id === todo1.id)?.status).toEqual(
        TodoStatus.NEW
      );
      expect(localStorage.setItem).toHaveBeenLastCalledWith(
        KEY_TODOS,
        JSON.stringify(nextState.todos)
      );
      expect(localStorage.__STORE__[KEY_TODOS]).toBe(
        JSON.stringify([{ ...todo1, status: TodoStatus.NEW }])
      );
    });
  });

  describe('DELETE_TODO', () => {
    test('should delete todo 1', () => {
      const nextState = reducer(initialState, deleteTodos([todo1.id]));
      expect(nextState.todos.find((x) => x.id === todo1.id)).toEqual(undefined);
      expect(localStorage.setItem).toHaveBeenLastCalledWith(
        KEY_TODOS,
        JSON.stringify(nextState.todos)
      );
      expect(localStorage.__STORE__[KEY_TODOS]).toBe(JSON.stringify([]));
    });
  });

  describe('UPDATE_TODO_CONTENT', () => {
    test('should update CONTENT todo 2 to TASK 2', () => {
      initialState.todos = [todo2];
      const nextState = reducer(
        initialState,
        updateTodoContent(todo2.id, todo2.content.toUpperCase())
      );
      expect(nextState.todos.find((x) => x.id === todo2.id)?.content).toEqual(
        todo2.content.toUpperCase()
      );
      expect(localStorage.setItem).toHaveBeenLastCalledWith(
        KEY_TODOS,
        JSON.stringify(nextState.todos)
      );
      expect(localStorage.__STORE__[KEY_TODOS]).toBe(
        JSON.stringify([{ ...todo2, content: todo2.content.toUpperCase() }])
      );
    });
  });

  describe('DELETE_TODO', () => {
    test('should delete all todo', () => {
      initialState.todos.push(todo3);
      const nextState = reducer(
        initialState,
        deleteTodos([todo2.id, todo3.id])
      );
      expect(nextState.todos.length).toEqual(0);
      expect(localStorage.setItem).toHaveBeenLastCalledWith(
        KEY_TODOS,
        JSON.stringify(nextState.todos)
      );
      expect(localStorage.__STORE__[KEY_TODOS]).toBe(JSON.stringify([]));
    });
  });
});
