import * as React from "react";

const FILTER_MAP = {
  All: () => true,
  Active: (task: any) => !task.completed,
  Completed: (task: any) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

interface IFilterListProps {}

const FilterList = () => {
  const [filter, setFilter] = React.useState("All");

  return FILTER_NAMES.map((name) => (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={name === filter}
      onClick={() => setFilter(name)}
    >
      <span>{name}</span>
    </button>
  ));
};

export default FilterList;
