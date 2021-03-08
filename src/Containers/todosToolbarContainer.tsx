import React, { useContext } from "react";
import TodoToolbar from "../components/todosToolbar";
import { TodosContext } from "../context";
import { deleteAllTodos, toggleAllTodos } from "../store/actions";
import { isTodoCompleted } from "../utils";

const TodosToolbarContainer: React.FC = () => {
  const { todos, todosDispatch } = useContext(TodosContext);

  const activeTodos = todos?.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    todosDispatch?.(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    todosDispatch?.(deleteAllTodos());
  };

  return (
    <TodoToolbar
      {...{
        todos,
        activeTodos,
        onToggleAllTodo,
        onDeleteAllTodo,
      }}
    />
  );
};
export default TodosToolbarContainer;
