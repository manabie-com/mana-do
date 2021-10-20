import React from "react";

export interface IButtonProps
  extends React.AllHTMLAttributes<HTMLButtonElement> {
  text: string;
  type?: TypeButton;
  color?: ColorButton;
}

export type TypeButton = "button" | "submit" | "reset";

export type ColorButton = "green" | "red" | "yellow" | "blue";
