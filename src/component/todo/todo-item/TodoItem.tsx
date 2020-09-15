import React, { useState } from 'react';
import TodoEdit from '../todo-edit';

export interface Props {
  id: string,
  content: string,
  isDone: boolean,
  onDelete: Function,
  onUpdateStatus: Function,
  onUpdate: (todoId: string, content: string) => void,
}

const TodoItem = ({ id, content, isDone, onUpdateStatus, onDelete, onUpdate }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  if (isEdit) {
    return <TodoEdit defaultValue={content} onCancel={() => setIsEdit(false)} onUpdate={(newContent: string) => onUpdate(id, newContent)} />
  }
  return (
  <div className="ToDo__item">
    <input
        type="checkbox"
        checked={isDone}
        onChange={(e) => onUpdateStatus(e, id)}
    />
    <span onDoubleClick={() => setIsEdit(true)}>{content}</span>
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