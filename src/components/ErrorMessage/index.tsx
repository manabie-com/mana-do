import React from "react";

interface ErrorMessageProps {
  message: string;
  className: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  const style = {
    color: "#ff0000",
    fontSize: "14px",
  };

  return (
    <>
      {message.length > 0 ? (
        <span className={className} style={style}>
          {message}
        </span>
      ) : null}
    </>
  );
};

export default ErrorMessage;
