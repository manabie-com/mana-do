import React from "react";

interface ActionButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  label: string;
  note?: string;
  active?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  note,
  active,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`Action__btn ${active ? "Action__btn--active" : ""}`}
    >
      {label}
      {note && <span className="Note__btn">{note}</span>}
    </button>
  );
};

export default ActionButton;
