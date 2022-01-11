import { useState, useRef, useEffect } from 'react';
import { Todo } from '../models/todo';
import { isTodoCompleted } from '../utils';

interface TodoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  todo: Todo;
  onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  onUpdateTodoContent: (id: string, content: string) => void;
  onDeleteTodo: (id: string) => void;
}

const ToDoItem = (props: TodoItemProps) => {
  const { todo, onUpdateTodoStatus, onUpdateTodoContent, onDeleteTodo } = props;
  const [editing, setEditing] = useState(false);
  const inputEditRef = useRef<HTMLInputElement>(null);

  const openEditForm = () => {
    setEditing(true);
    inputEditRef.current?.focus();
  }

  useEffect(() => {
    if (editing) inputEditRef.current?.focus();
  }, [editing]);

  // Update todo by double click
  const onUpdateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputEditRef.current && inputEditRef.current.value) {
      onUpdateTodoContent(todo.id, inputEditRef.current.value);
      setEditing(false);
    }
  }

  return (
    <div className="ToDo__item" data-testid="ToDo__item">
      <input
        type="checkbox"
        checked={isTodoCompleted(todo)}
        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
      />
      {editing ? <input
        ref={inputEditRef}
        className="Todo__input"
        defaultValue={todo.content}
        onKeyDown={onUpdateTodo}
        onBlur={() => setEditing(false)}
      ></input> : <span data-testid="Todo__content" onDoubleClick={() => openEditForm()}>{todo.content}</span>}
      <button
        className="Todo__delete"
        onClick={() => onDeleteTodo(todo.id)}
      >
        X
      </button>
    </div>
  );
}

export default ToDoItem;
