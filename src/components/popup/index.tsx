import React from "react";
import "./popup.css";

interface IPopup {
  input: string;
  setShowPopup: Function;
  onChangeField: React.ChangeEventHandler;
  onEditTodo: React.KeyboardEventHandler;
}

const Popup: React.FC<IPopup> = ({
  input,
  setShowPopup,
  onChangeField,
  onEditTodo,
}) => {
  return (
    <div className="popup">
      <div className="popup__container">
        <input
          autoFocus
          onBlur={(e) => setShowPopup(false)}
          type="text"
          className="popup__input"
          value={input}
          onChange={onChangeField}
          onKeyDown={onEditTodo}
        />
      </div>
    </div>
  );
};

export default Popup;
