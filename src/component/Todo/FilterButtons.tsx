import React from "react";
import { EnhanceTodoStatus } from "component/Todo/";
import { TodoStatus } from "models/todo";

interface FilterButtonsProps {
  showing: EnhanceTodoStatus;
  setShowing: React.Dispatch<React.SetStateAction<EnhanceTodoStatus>>;
}

interface ButtonProps {
  cb: () => void;
  buttonName: string;
  type: EnhanceTodoStatus;
}

const FilterButtons = ({ showing, setShowing }: FilterButtonsProps) => {
  const renderButton = ({ cb, buttonName, type }: ButtonProps) => {
    return (
      <button
        className={`btn-filter ${type === showing ? "btn-filter--active" : ""}`}
        onClick={cb}
        data-testid={`btn-filter-${type}`}
      >
        {buttonName}
      </button>
    );
  };

  return (
    <div className="todo__tabs">
      {renderButton({
        cb: () => setShowing("ALL"),
        buttonName: "All",
        type: "ALL",
      })}
      {renderButton({
        cb: () => setShowing(TodoStatus.ACTIVE),
        buttonName: "Active",
        type: TodoStatus.ACTIVE,
      })}
      {renderButton({
        cb: () => setShowing(TodoStatus.COMPLETED),
        buttonName: "Completed",
        type: TodoStatus.COMPLETED,
      })}
    </div>
  );
};

export default FilterButtons;
