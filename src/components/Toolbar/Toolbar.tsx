import "./Toolbar.css";

import React from "react";

/* Models */
import { TodoStatus, EnhanceTodoStatus } from "src/models/todo";

/* Components */
import Button from "src/common/Button/Button";
import Input from "src/common/Input/Input";

type Props = {
  setShowing: React.Dispatch<React.SetStateAction<EnhanceTodoStatus>>;
  activeTodos: boolean;
  showCheckBox: boolean;
  handleDeleteAllTodo: () => Promise<void>;
  handleUpdateAllTodo: (checked: boolean) => Promise<void>;
};

const Toolbar = ({
  setShowing,
  activeTodos,
  showCheckBox,
  handleDeleteAllTodo,
  handleUpdateAllTodo,
}: Props) => {

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    handleUpdateAllTodo(checked);
  };

  return (
    <div className="todo__toolbar">
      {showCheckBox ? (
        <Input
          type="checkbox"
          checked={activeTodos}
          onChange={onToggleAllTodo}
        />
      ) : null}
      <div className="todo__tabs">
        <Button onClick={() => setShowing("ALL")}>All</Button>
        <Button onClick={() => setShowing(TodoStatus.ACTIVE)}>Active</Button>
        <Button onClick={() => setShowing(TodoStatus.COMPLETED)}>
          Completed
        </Button>
      </div>
      <Button onClick={handleDeleteAllTodo}>Clear all todos</Button>
    </div>
  );
};

export default React.memo(Toolbar);
