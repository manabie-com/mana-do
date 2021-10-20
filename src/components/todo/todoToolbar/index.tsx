import React, { useMemo } from "react";
import { useTodo } from "../../../hooks/useTodo";
import { deleteAllTodos, toggleAllTodos } from "../../../store/actions";
import { isTodoCompleted } from "../../../utils";
import Button from "../../button";
import TodoTabs from "../todoTabs";
import "./todoToolbar.scss";

const TodoToolbar = (): JSX.Element => {
  const {
    state: { todos },
    dispatch,
  } = useTodo();

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    // we should show popup confirmation before delete
    if (window.confirm("Are you sure to delete clear all ?")) {
      dispatch(deleteAllTodos());
    }
  };

  const isDisable = todos.length === 0;

  // I use useMemo. the activeTodos only recompute when todos has changed
  // another way to calculate activeTodos
  // const activeTodos = todos.filter((todo) => !isTodoCompleted(todo)).length;
  const activeTodos = useMemo(
    () =>
      todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
      }, 0),
    [todos]
  );

  const isChecked = activeTodos === 0;

  return (
    <div className="todo-toolbar">
      <input
        disabled={isDisable}
        className="todo-toolbar__checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={onToggleAllTodo}
      />
      <TodoTabs />
      <Button
        text="Clear all"
        color="red"
        data-testid="clear"
        onClick={onDeleteAllTodo}
      />
    </div>
  );
};

export default TodoToolbar;
