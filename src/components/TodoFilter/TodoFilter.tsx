import * as React from "react";
import { ALL } from "../../common/constants";
import { EnhanceTodoStatus, Todo, TodoStatus } from "../../models/todo";
import Progress from "../Progress/Progress";

import "./TodoFilter.scss";

interface TodoFilterProps {
  todos: Todo[];
  showing: string;
  setShowing(ACTIVE: EnhanceTodoStatus): void;
}

const TodoFilter = ({todos, setShowing }: TodoFilterProps) => {

  const completedLength = (todos.filter(e => e.status === TodoStatus.COMPLETED)).length;
  const activeLength = todos.length - completedLength;
  const completedPercent = completedLength !== 0 ? (completedLength/(todos.length))*100 : 0;
  const activePercent = activeLength !== 0 ? (activeLength/(todos.length))*100 : 0;

  return (
    <div className="Todo__filter">
      <div id="filter-all" className="Todo__filter_item" onClick={() => setShowing(ALL)}>
        <h4>All</h4>
        <small>{todos.length} Items out of {todos.length}</small>
        <Progress value={100}/>
      </div>
      <div
        id="filter-active"
        className="Todo__filter_item"
        onClick={() => setShowing(TodoStatus.ACTIVE)}
      >
        <h4>Active</h4>
        <small>{activeLength} Items out of {todos.length}</small>
        <Progress value={activePercent}/>
      </div>
      <div
        id="filter-complete"
        className="Todo__filter_item"
        onClick={() => setShowing(TodoStatus.COMPLETED)}
      >
        <h4>Compeleted</h4>
        <small>{completedLength} Items out of {todos.length}</small>
        <Progress value={completedPercent}/>
      </div>
    </div>
  );
};

export default TodoFilter;
