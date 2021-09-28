import React from "react";
import { TodoFilters } from "../../../../models/todo";

const FilterItem = (props: {
  name: string;
  value: TodoFilters;
  onClick: () => void;
  label: string;
}) => {
  const { name, value, onClick, label } = props;

  return (
    <div>
      <button
        className="Action__btn"
        name={name}
        value={value}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default FilterItem;
