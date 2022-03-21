import shallow from "zustand/shallow";
import useTodoStore from "../store/useTodoStore";

const useTodoFacade = () => {
  const { todos, fetchTodos, createTodo, updateTodo, toggleAllTodos, deleteTodo, deleteAllTodos } = useTodoStore(
    (state) => ({
      todos: state.todos,
      fetchTodos: state.fetchTodos,
      createTodo: state.createTodo,
      updateTodo: state.updateTodo,
      toggleAllTodos: state.toggleAllTodos,
      deleteTodo: state.deleteTodo,
      deleteAllTodos: state.deleteAllTodos,
    }),
    shallow
  );

  return {
    todos,
    fetchTodos,
    createTodo,
    updateTodo,
    toggleAllTodos,
    deleteTodo,
    deleteAllTodos,
  };
};

export default useTodoFacade;
