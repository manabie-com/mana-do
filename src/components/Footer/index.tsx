import React, { useState } from "react";

import StatusFilter from "../StatusFilter";
import { TodoStatus } from "../../models/todo";
import { isTodoActive } from "../../utils";
import { setFilterStatusChanged, setTodos } from "../../store/actions";
import { useAppContext } from "../../AppContext";
import { Wrapper } from "./styles";

const Footer = () => {
  const {
    state: { todos, filter },
    dispatch,
  } = useAppContext();
  const [showing, setShowing] = useState<TodoStatus>(filter.status);

  const unCompletedTodos = todos.reduce(function (accum, todo) {
    return isTodoActive(todo) ? accum + 1 : accum;
  }, 0);

  const onChangeStatus = (status: TodoStatus) => {
    setShowing(status);
    dispatch(setFilterStatusChanged(status));
  };

  const deleteAllCompletedTodo = () => {
    dispatch(setTodos(todos.filter((x) => x.status !== TodoStatus.Completed)));
  };

  return (
    <Wrapper>
      <div className="button-container">
        <p className="items-left">
          <span className="text">{unCompletedTodos} active left</span>
        </p>
        <StatusFilter currentStatus={showing} onChangeStatus={onChangeStatus} />
        <button className="clear-completed-btn" onClick={deleteAllCompletedTodo}>
          Clear completed
        </button>
      </div>
      <div className="mobile-button-container">
        <StatusFilter currentStatus={showing} onChangeStatus={onChangeStatus} />
      </div>
    </Wrapper>
  );
};

export default Footer;
