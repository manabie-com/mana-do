import React from 'react';

interface Props {
  handleOnClickDelete: () => void;
  handleOnChangeCheckBox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  content: string;
}

/* I created a new component to separate the handling logic 
making us have as many stateless components as possible
1. Reusable
2. Capable of maintenance
3. Flexibility
*/
const ToDoItem: React.FC<Props> = ({
  checked,
  content,
  handleOnChangeCheckBox,
  handleOnClickDelete,
}) => {
  return (
    <div className='ToDo__item'>
      <input
        type='checkbox'
        checked={checked}
        onChange={(e) => handleOnChangeCheckBox(e)}
      />
      <span>{content}</span>
      <button className='Todo__delete' onClick={handleOnClickDelete}>
        X
      </button>
    </div>
  );
};

export default ToDoItem;
