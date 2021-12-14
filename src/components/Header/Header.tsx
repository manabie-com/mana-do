import React from "react";
import { ManabieLogo } from "../../models/images";
import "./Header.scss";

export const Header: React.FC<IHeader> = ({ title }) => {
  return (
    <div className="header">
      <img src={ManabieLogo} alt="m-logo" />
      <h1 data-testid="Header__title">{title}</h1>
    </div>
  );
};
