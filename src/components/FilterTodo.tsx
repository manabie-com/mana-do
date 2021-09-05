import React from "react";
import { Todo, TodoStatus } from "../models/todo";
import { isTodoCompleted } from "../utils";

interface IFilterTodo {
  todoList: Array<Todo>;
  showing: string;
  setShowing: any;
  onDeleteAllTodo: any;
}

const FilterTodo = ({
  todoList,
  showing,
  setShowing,
  onDeleteAllTodo,
}: IFilterTodo) => {
  return (
    <div className="filter_bottom">
      <div className="total_todo">
        <div>
          {todoList.length} {todoList.length > 0 ? "items" : "item"}
        </div>
      </div>
      <div className="filter_tabs">
        <div
          className={`tab ${TodoStatus.ALL === showing ? "active" : ""}`}
          onClick={() => setShowing("ALL")}
        >
          All
        </div>
        <div
          className={`tab ${TodoStatus.ACTIVE === showing ? "active" : ""}`}
          onClick={() => setShowing(TodoStatus.ACTIVE)}
        >
          Active
        </div>
        <div
          className={`tab ${TodoStatus.COMPLETED === showing ? "active" : ""}`}
          onClick={() => setShowing(TodoStatus.COMPLETED)}
        >
          Completed
        </div>
      </div>
      <div className="tab clear_all" onClick={onDeleteAllTodo}>
        Clear all todos
      </div>
    </div>
  );
};

export default FilterTodo;
