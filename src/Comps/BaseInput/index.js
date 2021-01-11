import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

/**
 * - passing props label for use case at login
 * - not passing props label or faulty value of props label return input
 * for use case at todos List
 */

export const BaseInput = ({
  label,
  id = undefined,
  propsLabel,
  inputRef,
  ...rest
}) => {
  if (!label) {
    return <input id={id} ref={inputRef} {...rest} />;
  }

  return (
    <label htmlFor={id} {...propsLabel}>
      <span className="label">{label}</span>
      <input id={id} {...rest} ref={inputRef} />
    </label>
  );
};

/**
 * props validation
 */
BaseInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  propsLabel: PropTypes.object,
  inputRef: PropTypes.any,
};

export default BaseInput;
