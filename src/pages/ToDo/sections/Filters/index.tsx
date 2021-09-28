import React from "react";
import { TodoFilters } from "../../../../models/todo";
import FilterItem from "./FilterItem";

const Filters = (props: {
  filter: TodoFilters;
  setTodoFilter: (todo: TodoFilters) => void;
}) => {
  const { filter, setTodoFilter } = props;
  return (
    <div className="Todo__tabs">
      <FilterItem
        name="All"
        value={TodoFilters.ALL}
        onClick={() => setTodoFilter(TodoFilters.ALL)}
        label="All"
      />
      <FilterItem
        name="All"
        value={TodoFilters.ACTIVE}
        onClick={() => setTodoFilter(TodoFilters.ACTIVE)}
        label="Active"
      />
      <FilterItem
        name="All"
        value={TodoFilters.COMPLETED}
        onClick={() => setTodoFilter(TodoFilters.COMPLETED)}
        label="Complete"
      />
    </div>
  );
};

export default Filters;
