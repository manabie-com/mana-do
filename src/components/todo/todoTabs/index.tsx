import React from "react";
import { Constants } from "../../../constants";
import { useTodo } from "../../../hooks/useTodo";
import { EnhanceTodoStatus, TodoStatus } from "../../../models/todo";
import { setShowing } from "../../../store/actions";
import Button from "../../button";
import "./todoTabs.scss";

const TodoTabs = (): JSX.Element => {
  const { dispatch } = useTodo();

  const onChangeShowing = (showing: EnhanceTodoStatus) => {
    dispatch(setShowing(showing));
  };
  // focus all button when load page
  return (
    <div className="todo-tabs">
      <Button
        autoFocus
        text="All"
        onClick={() => onChangeShowing(Constants.ALL)}
        color="blue"
        data-testid="all"
      />
      <Button
        text="Active"
        onClick={() => onChangeShowing(TodoStatus.ACTIVE)}
        color="yellow"
        data-testid="active"
      />
      <Button
        text="Completed"
        onClick={() => onChangeShowing(TodoStatus.COMPLETED)}
        color="green"
        data-testid="completed"
      />
    </div>
  );
};

export default TodoTabs;
