import * as React from "react";

interface ITagsProps {
  text: string;
}

const Tags: React.FunctionComponent<ITagsProps> = ({ text }) => {
  return <span className="components__tags">{text}</span>;
};

export default Tags;
