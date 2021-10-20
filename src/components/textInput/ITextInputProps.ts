import React from "react";

export interface ITextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
