import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Todo } from '../models/todo';
import { isTodoCompleted } from '../utils';

type TodoItemProps = {
  todo: Todo;
  deleteTodo: (e: ReactMouseEvent<HTMLButtonElement>, id: string) => void;
  updateTodoStatus: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  editTodo: (id: string, content: string) => void;
};

const TodoItem = ({
  todo,
  deleteTodo,
  updateTodoStatus,
  editTodo,
}: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [content, setContent] = useState<string>(todo.content);

  useEffect(() => {
    const stopEditing = (e: MouseEvent) => {
      setIsEdit(false);
      setContent(todo.content);
    };

    document.body.addEventListener('click', stopEditing, { capture: true });

    return () => {
      document.body.removeEventListener('click', stopEditing, {
        capture: true,
      });
    };
  }, [todo.content]);

  const edit = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setIsEdit(true);
    },
    [setIsEdit]
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setContent(e.target.value);
    },
    [setContent]
  );

  const onSubmit = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Enter':
          editTodo(todo.id, content);
          setIsEdit(false);
          break;
        case 'Escape':
          setIsEdit(false);
          break;
        default:
          break;
      }
    },
    [editTodo, setIsEdit, content, todo]
  );

  const refCallback = useCallback((node: HTMLInputElement) => {
    node?.focus();
  }, []);

  return (
    <div className="ToDo__item">
      <input
        type="checkbox"
        checked={isTodoCompleted(todo)}
        onChange={e => updateTodoStatus(e, todo.id)}
      />
      {isEdit ? (
        <input
          className="Todo__input"
          type="text"
          value={content}
          onChange={onChange}
          onKeyDown={onSubmit}
          ref={refCallback}
        />
      ) : (
        <span onClick={edit}>{todo.content}</span>
      )}
      <button
        type="button"
        className="Todo__delete"
        onClick={e => deleteTodo(e, todo.id)}
      >
        X
      </button>
    </div>
  );
};

export default TodoItem;
