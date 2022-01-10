import { useState, useEffect, useRef, useReducer } from 'react';
import reducer, { initialState } from '../store/reducer';
import {
  deleteTodo,
  updateTodoContent,
} from '../store/actions';
import { Todo } from '../models/todo';
import { isTodoCompleted } from '../utils';

interface TodoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  todo: Todo;
  onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}

const TodoItem = (props: TodoItemProps) => {
  const { todo, onUpdateTodoStatus } = props;
  const [, dispatch] = useReducer(reducer, initialState);
  const [editing, setEditing] = useState<boolean>(false);
  const inputEditRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputEditRef.current?.focus();
  }, [editing]);

  // Update todo by double click
  const onUpdateTodoContent = (e: React.KeyboardEvent<HTMLInputElement>, todoId: string) => {
    if (e.key === 'Enter' && inputEditRef.current && inputEditRef.current.value) {
      dispatch(updateTodoContent(todoId, inputEditRef.current?.value || ''));
      setEditing(false);
    }
  }

  const openEditForm = () => {
    setEditing(true);
    inputEditRef.current?.focus();
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
        onKeyDown={e => onUpdateTodoContent(e, todo.id)}
        onBlur={() => setEditing(false)}
      ></input> : <span data-testid="Todo__content" onDoubleClick={() => openEditForm()}>{todo.content}</span>}
      <button
        className="Todo__delete"
        onClick={() => dispatch(deleteTodo(todo.id))}
      >
        X
      </button>
    </div>
  );
}

export default TodoItem;
