import React from "react";

import { TodoStatus } from "../../models/todo";
import { Wrapper } from "./styles";

interface StatusFilterProps {
  currentStatus: TodoStatus;
  onChangeStatus: (status: TodoStatus) => void;
}

const StatusFilter = ({ currentStatus, onChangeStatus }: StatusFilterProps) => {
  const result = Object.keys(TodoStatus).map((item, i) => {
    const status: TodoStatus = TodoStatus[item as keyof typeof TodoStatus];
    return (
      <button
        key={status}
        className={`select-btn ${currentStatus === status ? `active-${status}` : ""}`}
        onClick={() => onChangeStatus(status)}
      >
        {status}
      </button>
    );
  });

  return <Wrapper>{result}</Wrapper>;
};

export default StatusFilter;
