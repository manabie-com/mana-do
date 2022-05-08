import React from "react";
import { MdTaskAlt } from "react-icons/md";
import "./styles.scss";

const Header = () => {
  return (
    <div className="header">
      <MdTaskAlt fontSize={36} color="#3A52D1" />
      <h1 className="header__title" data-testid="header">MANA DO</h1>
    </div>
  );
};

export default Header;
