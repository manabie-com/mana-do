import * as React from "react";

interface ITagsProps {
  text: string;
}

const Tags: React.FunctionComponent<ITagsProps> = ({ text }) => {
  const [active, setActive] = React.useState(false);
  const handleOnClick = () => {
    setActive(true);
  };
  return (
    <span
      className={`components__tags ${active ? "components__tags--active" : ""}`}
      onClick={handleOnClick}
    >
      {text}
    </span>
  );
};

export default Tags;
