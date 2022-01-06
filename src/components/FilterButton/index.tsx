import React from "react";

interface FilterButtonProps {
  active?: boolean;
  onClick: () => void;
  children: React.ReactElement | string;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  active = false,
  onClick,
  children,
}) => {
  return (
    <button
      className={`Action__btn Filter__btn ${active ? "active" : ""}`}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export default FilterButton;
