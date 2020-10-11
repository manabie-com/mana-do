import React from "react";
import Button from "src/components/button";
import { TodoStatus, EnhanceTodoStatus } from "src/models/todo";

export type ToolbarProps = {
  onChange: (status: EnhanceTodoStatus) => void;
  activeTodos: number;
  totalTodos: number;
  completedTodos: number;
  showing: EnhanceTodoStatus;
};

export const onChangeFilter = (
  onChange: (status: EnhanceTodoStatus) => void,
  status: EnhanceTodoStatus
) => () => {
  onChange(status);
};

export const Toolbar: React.FC<ToolbarProps> = ({
  onChange,
  activeTodos,
  completedTodos,
  totalTodos,
  showing,
}) => {
  const handleFilterAll = onChangeFilter(onChange, "ALL");
  const handleFilterActive = onChangeFilter(onChange, TodoStatus.ACTIVE);
  const handleFilterCompleted = onChangeFilter(onChange, TodoStatus.COMPLETED);

  return (
    <div className="mt-2">
      <Button
        className="inline-block mr-2"
        onClick={handleFilterAll}
        variant={showing === "ALL" ? "primary" : "secondary"}
      >
        All ({totalTodos})
      </Button>
      <Button
        className="inline-block mr-2"
        variant={showing === TodoStatus.ACTIVE ? "primary" : "secondary"}
        onClick={handleFilterActive}
      >
        Active ({activeTodos})
      </Button>
      <Button
        className="inline-block mr-2"
        variant={showing === TodoStatus.COMPLETED ? "primary" : "secondary"}
        onClick={handleFilterCompleted}
      >
        Completed ({completedTodos})
      </Button>
    </div>
  );
};

export default Toolbar;
