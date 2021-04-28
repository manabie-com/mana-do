export const setTodos = (todo: any) => {
  return localStorage.setItem('todos', JSON.stringify(todo))
};

export const getTodos = () => {
  const todos = localStorage.getItem('todos');
  if (todos) {
    return JSON.parse(todos);
  }

  return [];
};

export const clearTodos = () => localStorage.removeItem('todos')