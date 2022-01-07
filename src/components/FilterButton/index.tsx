import React from "react";

export interface FilterButtonProps {
  active?: boolean;
  onClick: () => void;
  children: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  active = false,
  onClick,
  children,
}) => {
  return (
    <button
      data-testid="btn-filter"
      className={`Action__btn Filter__btn ${active ? "active" : ""}`}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export default FilterButton;
