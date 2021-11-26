import React from "react";
import PropTypes from "prop-types";

const FormLabel = (props: any) => {
  const { htmlFor, style, title, children } = props;
  return (
    <label htmlFor={htmlFor} style={style}>
      <br />
      {title}
      {children}
    </label>
  );
};

FormLabel.propTypes = {
  htmlFor: PropTypes.string,
  style: PropTypes.any,
  title: PropTypes.string,
  children: PropTypes.any,
};

export default FormLabel;
