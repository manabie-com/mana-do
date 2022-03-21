import React from "react";
import { TodoStatus } from "../todo.models";
import EmptySvg from "assets/empty.svg";
import EmptyActiveSvg from "assets/empty-active.svg";
import Styles from "./todo-item.module.scss";

export type TodoEmptyProps = {
  emptyStatus: TodoStatus;
};

const TodoEmpty = ({ emptyStatus }: TodoEmptyProps) => {
  const renderEmptyQuote = () => {
    switch (emptyStatus) {
      case TodoStatus.COMPLETED:
        return (
          <div>
            <img src={EmptySvg} alt="Empty" />
            <p>
              Seem like you haven't Completed any TODO yet
              <br /> Go and make something done
            </p>
          </div>
        );

      default:
        return (
          <div>
            <img src={EmptyActiveSvg} alt="Empty Active" />
            <p>
              Seem like you don't have any Active TODO yet
              <br /> Go and find something to do
            </p>
          </div>
        );
    }
  };

  return <div className={Styles.Container}>{renderEmptyQuote()}</div>;
};

export default TodoEmpty;
