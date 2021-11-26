import React from "react";
import PropTypes from "prop-types";

const Input = (props: any) => {
  const { type, checked, id, name, value, placeholder, style, onChange } =
    props;
  return (
    <div>
      <input
        type={type}
        checked={checked}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        style={style}
        onChange={onChange}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.any,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: "text",
};

export default Input;
