import React from "react";
import PropTypes from "prop-types";

import "./styles.css";
/**
 *
 * Check Box with input element
 */
export const InputCheck = ({ label = "Select All", ...rest }) => {
  return (
    <label className="ICContainer">
      {label}
      <input type="checkbox" {...rest} />
      <span className="checkmark"></span>
    </label>
  );
};

InputCheck.propTypes = {
  label: PropTypes.string,
};

export default InputCheck;
