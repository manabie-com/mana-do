import React from "react";
import "./Error.scss";

interface ErrorProps {
  title: string;
}

function Error(props: ErrorProps) {
  const { title = "" } = props;
  return <div className="error">{title}</div>;
}

export default React.memo(Error);
