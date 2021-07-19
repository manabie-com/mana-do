import React, { useState, useEffect, useRef, useCallback } from "react";
import useKeypress from "../../hooks/useKeyPress";
import useOnClickOutside from "../../hooks/useOnClickOutSide";
import styles from './styles.module.css'

function ToDoContent(props:any) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(props.text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef: any = useRef(null);

  const enter = useKeypress("Enter");
  const esc = useKeypress("Escape");

  const { onSetText } = props;

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    if (isInputActive ) {
      inputValue &&  onSetText(inputValue);
      setIsInputActive(false);
    }
  });

  const onEnter = useCallback(() => {
    if (enter && inputValue) {
      onSetText(inputValue);
      setIsInputActive(false);
    }
  }, [enter, inputValue, onSetText]);

  const onEsc = useCallback(() => {
    if (esc ) {
      setInputValue(props.text);
      setIsInputActive(false);
    }
  }, [esc, props.text]);

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive ) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and close the editor
      onEnter();
      // if Escape is pressed, revert the text and close the editor
      onEsc();
    }
  }, [onEnter, onEsc, isInputActive]); // watch the Enter and Escape key presses

  const handleInputChange = useCallback(
    event => {
      setInputValue(event.target.value);
    },
    [setInputValue]
  );

  const handleSpanClick = useCallback(() => setIsInputActive(true), [
    setIsInputActive
  ]);

  return (
    <span className={styles.inlineText} ref={wrapperRef}>
      <span
        ref={textRef}
        onDoubleClick={handleSpanClick}
        className={`inlineTextSpan ${
          !isInputActive ? "isActive" : "isHidden"
        } ${props.isComplete && `isComplete`}`}
      >
        {props.text}
      </span>
      <input
        ref={inputRef}
        // set the width to the input length multiplied by the x height
        // it's not quite right but gets it close
        // style={{ minWidth: Math.ceil(inputValue.length) + "ch" }}
        value={inputValue}
        onChange={handleInputChange}
        className={`inlineTextInput ${
          isInputActive ? "isActive" : "isHidden"
        }`}
      />
    </span>
  );
}

export default ToDoContent;
