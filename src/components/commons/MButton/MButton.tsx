import React, {useRef} from "react";

type ButtonType = 'submit' | 'reset' | 'button';

interface MButtonProps {
  btnExtraClassName?: string,
  type?: ButtonType,
  style?: {},
  children: any,
  onClickAction?: () => void
}

const MButton = ({
  btnExtraClassName,
  type = 'button',
  style,
  children,
  onClickAction
} : MButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const onClick = () => {
    if (onClickAction) {
      onClickAction();
    }

    // Add a css trick ->
    // button background color will change button is focus and then blur immediately
    if (buttonRef.current) {
      buttonRef.current.blur();
    }
  }

  return (
    <button type={type} className={`m-button ${btnExtraClassName || ''}`} style={style} onClick={onClick} ref={buttonRef}>
      {children}
    </button>
  )
}

export default MButton;
