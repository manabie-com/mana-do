import React from "react";
import './Button.scss'

interface ButtonProps {
  title: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button(props: ButtonProps) {
  const { title = "",onClick } = props;
  return (
    <div className="button">
      <button onClick={onClick}> {title} </button>
    </div>
  );
}

export default React.memo(Button);
