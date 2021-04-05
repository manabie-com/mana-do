import "./Header.css";

import React from "react";

/* Components */
import Button from "src/common/Button/Button";

type Props = {
  showing: string;
};

const Header = ({ showing }: Props) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="todo__header">
      <label>
        Status:
        <span className={showing.toLocaleLowerCase()}> {showing} </span>
      </label>
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
};

export default React.memo(Header);
