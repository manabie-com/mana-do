import React from "react";
import styled from "styled-components";
// import styled from "styled-components";

interface ActionButtonProps {
  text: string;
  onClick?: () => void;
  active?: boolean;
}

const StyledButton = styled.button`
  margin: 0 3px;
  min-width: unset;
  background-color: transparent;
  outline: unset;
  box-shadow: unset;
  cursor: pointer;
  text-transform: capitalize;

  &.active {
    color: blueviolet;
    font-weight: bold;
  }
`;

export default function ActionButton({
  text,
  active,
  onClick,
}: ActionButtonProps) {
  return (
    <StyledButton
      className={`Action__btn ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {text}
    </StyledButton>
  );
}
