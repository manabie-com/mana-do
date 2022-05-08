import { Button } from "components/button";
import { DATA_BUTTONS } from "components/todoTab/data";
import { EnhanceTodoStatus } from "containers/ToDoPage";
import React, { Dispatch, FC, memo } from "react";
import "./styles.scss";

export interface ITodoTabProps {
  selectedStatus: EnhanceTodoStatus;
  onClickSelectStatus: Dispatch<React.SetStateAction<EnhanceTodoStatus>>;
  onDeleteAllTodo: () => void;
}

const TodoTab: FC<ITodoTabProps> = ({
  selectedStatus,
  onClickSelectStatus,
  onDeleteAllTodo,
  ...props
}) => {
  const handleClickSelectStatus = (status: EnhanceTodoStatus): void => {
    onClickSelectStatus(status);
  };

  const handleDeleteAlldoto = (): void => {
    if (onDeleteAllTodo) onDeleteAllTodo();
  };

  return (
    <>
      <div className="todo-tab" {...props} data-testid="todo-tab">
        {DATA_BUTTONS.map(({ id, title, status }) => (
          <Button
            key={id}
            aria-label={title}
            onClick={() => handleClickSelectStatus(status)}
            className={`btn-todo--main ${
              selectedStatus === status ? "btn-todo--selected" : ""
            }`}
          >
            {title}
          </Button>
        ))}
      </div>
      <Button
        aria-label="Clear all"
        onClick={handleDeleteAlldoto}
        className="btn-todo--danger"
      >
        Clear all todos
      </Button>
    </>
  );
};

export default memo(TodoTab);
