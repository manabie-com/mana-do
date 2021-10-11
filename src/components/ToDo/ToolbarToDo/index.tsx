import React, { useState } from "react";
import { Todo, TodoStatus } from "models/todo";
import { EnhanceTodoStatus } from "pages/ToDoPage";
import { isTodoCompleted } from "utils";
import {
  Button,
  ButtonColors,
  Checkbox,
  ModalConfirm,
  Paper,
} from "components/commons";
import cn from "classnames";
import "./style.css";

interface Props {
  todos: Todo[];
  showing: EnhanceTodoStatus;
  onFilter: (status: EnhanceTodoStatus) => void;
  onDeleteAllToDo: () => void;
  onToggleAllToDo: (checked: boolean) => void;
}

const TAB_FILTER = [
  {
    name: "All",
    value: "ALL",
  },
  {
    name: "Active",
    value: TodoStatus.ACTIVE,
  },
  {
    name: "Completed",
    value: TodoStatus.COMPLETED,
  },
];

const ToolbarToDo = (props: Props) => {
  const { showing, todos, onFilter, onDeleteAllToDo, onToggleAllToDo } = props;
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  function _toggleModalConfirm() {
    setShowModalConfirm((prev) => !prev);
  }

  return (
    <Paper className="Todo__toolbar p10">
      {todos.length ? (
        <div className="Action__checkAll">
          <Checkbox
            checked={activeTodos === 0}
            onChange={(e) => onToggleAllToDo(e.target.checked)}
          />
        </div>
      ) : (
        <div />
      )}
      <div className="Todo__tabs">
        {TAB_FILTER.map((tab, index) => (
          <div
            key={index}
            className={cn(
              "Action__btn",
              showing === tab.value && "Action__btn-selected"
            )}
            onClick={() => onFilter(tab.value as EnhanceTodoStatus)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <Button
        disabled={!todos.length}
        color={ButtonColors.danger}
        onClick={_toggleModalConfirm}
      >
        Clear all
      </Button>

      <ModalConfirm
        onConfirm={() => {
          onDeleteAllToDo();
          _toggleModalConfirm();
        }}
        onClose={_toggleModalConfirm}
        show={showModalConfirm}
      />
    </Paper>
  );
};

export default ToolbarToDo;
