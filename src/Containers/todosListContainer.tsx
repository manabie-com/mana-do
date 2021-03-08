import React, { useContext } from "react";
import TodosList from "../components/todosList";
import { TodosContext } from "../context";
import { Todo, TodoStatus } from "../models/todo";
import { updateTodoStatus } from "../store/actions";

const TodosListContainer: React.FC = () => {
  const { todos, todosDispatch, showing } = useContext(TodosContext);

  const showTodos = todos?.filter((todo: Todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    todosDispatch?.(updateTodoStatus(todoId, e.target.checked));
  };

  return (
    <TodosList
      data-testid="todolist"
      {...{ showTodos, onUpdateTodoStatus, todosDispatch }}
    />
  );
};

export default TodosListContainer;
