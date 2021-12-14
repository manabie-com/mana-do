import React from "react";
import "./ActionButton.scss";

export const ActionButton: React.FC<IActionButton> = ({
  actionBtn,
  statusCheck,
  border,
  boxShadow,
}) => {
  const { title, status, onClick } = actionBtn;
  return (
    <button
      className={`Action__btn ${
        status && status === statusCheck ? "Action__btn--checked" : ""
      }`}
      onClick={onClick}
      style={{ border, boxShadow }}
    >
      {title}
    </button>
  );
};
