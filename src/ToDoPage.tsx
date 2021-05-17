/**
 * I created two folders `components` and `containers`
 *  + components: contains common(reuseable) components, that components has no business logic, it just present data (How data is display ?)
 *  + containers: contains components that has business logic (call api, dispatch action..), it answer for question `What data is display ?`
 */
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import ToDoAfter from "./containers/TodoAfter";
import ToDoBefore from "./containers/TodoBefore";

const ToDoPage = (props: RouteComponentProps) => {
  return (
    <div className="todo__wrapper">
      <ToDoBefore {...props} />
      <ToDoAfter {...props} />
    </div>
  );
};

export default ToDoPage;
