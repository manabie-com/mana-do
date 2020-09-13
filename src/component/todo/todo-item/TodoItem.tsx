import React from 'react';

interface AppProps {
  id: string,
  content: string,
  isDone: boolean,
  onDelete: Function,
  onUpdateStatus: Function,
}

const TodoItem = ({ id, content, isDone, onUpdateStatus, onDelete }: AppProps) => {
  return (
  <div className="ToDo__item">
    <input
        type="checkbox"
        checked={isDone}
        onChange={(e) => onUpdateStatus(e, id)}
    />
    <span>{content}</span>
    <button
        className="Todo__delete"
        onClick={() => onDelete(id)}
    >
        X
    </button>
  </div>)
};

TodoItem.defaultProps = {
  onDelete: () => {},
  onUpdateStatus: () => {}
}

export default TodoItem;