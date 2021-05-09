import { TodoStatus } from 'models/todo';

const setTodos = todos => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const getTodos = () => {
  const todos = JSON.parse(localStorage.getItem('todos')) ?? [];
  if (!Array.isArray(todos) || todos.length === 0) {
    setTodos([]);
  }
  return todos;
};

const todoService = {
  list: () =>
    new Promise(resolve => {
      setTimeout(() => {
        const todos = getTodos();
        resolve(todos);
      }, 200);
    }),
  create: body =>
    new Promise(resolve => {
      setTimeout(() => {
        const todos = getTodos();
        const newTodos = [body, ...todos];
        setTodos(newTodos);
        resolve(newTodos);
      }, 200);
    }),

  delete: todoId =>
    new Promise(resolve => {
      setTimeout(() => {
        const todos = getTodos();
        const newTodos = todos.filter(({ id }) => id !== todoId);
        setTodos(newTodos);
        resolve(newTodos);
      }, 200);
    }),
  update: (todoId, data) =>
    new Promise(resolve => {
      setTimeout(() => {
        const todos = getTodos();
        const newTodos = todos.map(todo => (todo.id === todoId ? data : todo));
        setTodos(newTodos);
        resolve(newTodos);
      }, 200);
    }),
  deleteAll: () =>
    new Promise(resolve => {
      setTimeout(() => {
        setTodos([]);
        resolve([]);
      }, 200);
    }),
  completeAll: () => {
    new Promise(resolve => {
      setTimeout(() => {
        const todos = getTodos();
        const newTodos = todos.map(todo => ({
          ...todo,
          status: TodoStatus.COMPLETED
        }));
        setTodos(newTodos);
        resolve(newTodos);
      }, 200);
    });
  },
  activeAll: () => {
    new Promise(resolve => {
      setTimeout(() => {
        const todos = getTodos();
        const newTodos = todos.map(todo => ({
          ...todo,
          status: TodoStatus.ACTIVE
        }));
        setTodos(newTodos);
        resolve(newTodos);
      }, 200);
    });
  }
};

export default todoService;
