import React from "react";
import "../scss/SubmitButton.scss";
const SubmitButton = (props: any) => {
  return (
    <button type="submit" className="submitButton">
      <div className="contentButton">{props.children}</div>
    </button>
  );
};

export default SubmitButton;
