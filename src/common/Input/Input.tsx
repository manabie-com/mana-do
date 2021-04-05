import "./Input.css";

import React, { useMemo } from "react";

export type Props = {
  id?: string;
  name?: string;
  type?: string;
  label?: string;
  value?: string | number | readonly string[] | undefined;
  checked?: boolean;
  className?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  defaultValue?: string;
  error?: boolean;
  messageError?: string;
};

export type Ref = HTMLInputElement;

const Input = React.forwardRef<Ref, Props>(
  ({ error, messageError, label, ...rest }, ref) => {
    const renderMessageError = useMemo(() => {
      return (
        <div>
          <label className="label__errorMessage">{messageError}</label>
        </div>
      );
    }, [messageError]);

    return (
      <>
        {error && renderMessageError}
        {label ? (
          <label>
            {label}
            <input ref={ref} {...rest} />
          </label>
        ) : (
          <input ref={ref} {...rest} />
        )}
      </>
    );
  }
);

Input.defaultProps = {};

export default React.memo(Input);
