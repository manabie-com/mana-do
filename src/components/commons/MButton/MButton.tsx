import React, {useRef} from 'react';

type ButtonType = 'submit' | 'reset' | 'button';

interface MButtonProps {
  className?: string,
  type?: ButtonType,
  style?: {},
  children?: any,
  onClickAction?: () => void
}

/**
 * Manabie's Button
 *
 * @param className: extra class that pass to button
 * @param type: type of button (submit | button | reset)
 * @param style: inline style - NOT RECOMMEND
 * @param children: Text show in button
 * @param onClickAction: Action fire when button is clicked
 * @constructor
 */

const MButton = ({
  className,
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
    <button type={type} className={`MButton ${className || ''}`} style={style} onClick={onClick} ref={buttonRef}>
      {children}
    </button>
  )
}

export default MButton;
