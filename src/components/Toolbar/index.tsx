import React from "react";
import { TodoStatus } from "../../models/todo";
import { getClassNameActiveByType } from "../../utils";
import Button from "../Button";

interface ToolbarProps {
  showing: string;
  setShowing: React.Dispatch<React.SetStateAction<TodoStatus>>;
  onDeleteAllTodo: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  showing,
  setShowing,
  onDeleteAllTodo,
}) => {
  return (
    <div className="Todo__tabs">
      <div className="mb-10 ">{`Filter by status: ${showing}`}</div>
      <div className="Todo__WrapperButtons">
        <Button
          className={`Action__btn ${getClassNameActiveByType(
            showing,
            "ALL"
          )} mr-3`}
          onClick={() => setShowing(TodoStatus.ALL)}
          name="buttonShowAll"
          label="All"
        />
        <Button
          className={`Action__btn ${getClassNameActiveByType(
            showing,
            TodoStatus.ACTIVE
          )} mr-3`}
          onClick={() => setShowing(TodoStatus.ACTIVE)}
          name="buttonActive"
          label="Active"
        />
        <Button
          className={`Action__btn ${getClassNameActiveByType(
            showing,
            TodoStatus.COMPLETED
          )} mr-3`}
          onClick={() => setShowing(TodoStatus.COMPLETED)}
          name="buttonCompleted"
          label="Completed"
        />
        <Button
          className="Action__btn Button__ClearAll"
          onClick={onDeleteAllTodo}
          name="buttonClearAll"
          label="Clear all todos"
        />
      </div>
    </div>
  );
};

export default Toolbar;
