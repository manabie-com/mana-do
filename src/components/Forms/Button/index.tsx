import React from "react";
import PropTypes from "prop-types";

const Button = (props: any) => {
  const { className, type, style, title, onClick } = props;
  return (
    <button className={className} type={type} style={style} onClick={onClick}>
      {title}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.any,
  type: PropTypes.string,
  style: PropTypes.any,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: "button",
};

export default Button;
