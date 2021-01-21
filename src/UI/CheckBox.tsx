import React from "react";
interface Props {
  checked: boolean;
  onChange: (E: React.ChangeEvent<HTMLInputElement>) => void;
}
const CheckBox: React.FC<Props> = ({ checked, onChange }) => {
  return (
    <>
      <input
        className="ToDo__state"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 200 25"
        className="ToDo__icon"
      >
        <use xlinkHref="#todo__box" className="ToDo__box"></use>
        <use xlinkHref="#todo__check" className="ToDo__check"></use>
        <use xlinkHref="#todo__circle" className="ToDo__circle"></use>
      </svg>
    </>
  );
};

export default CheckBox;
