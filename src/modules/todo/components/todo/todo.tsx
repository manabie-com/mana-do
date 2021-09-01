import React from 'react';

interface TodoProps {
  id: string,
  content: string,
  status: boolean,
  onChangeStatus: (id: string, status: boolean) => void;
  onDeleteItem: (id: string) => void;
}

const Todo = (props: TodoProps) => {
  const { content, id, status, onChangeStatus, onDeleteItem } = props;

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const inputValue = e.target.checked;
    onChangeStatus(id, inputValue);
  }

  return (
    <div className="ToDo__item">
      <input
        type="checkbox"
        checked={status}
        onChange={onChangeCheckbox}
      />
      <span>{content}</span>
      <button
        className="Todo__delete"
        onClick={() => onDeleteItem(id)}>X
      </button>
    </div>
  );
};

export default Todo;