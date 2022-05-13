import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Checkbox, TodoInput } from '../App.style';
import { Todo } from '../models/todo';
import { isTodoCompleted } from '../utils';
import { DeleteButton, StyledTodoItem, TodoContent } from './TodoItem.style';

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

    document.body.addEventListener('click', stopEditing);

    return () => {
      document.body.removeEventListener('click', stopEditing);
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
    <StyledTodoItem>
      <Checkbox
        data-testid="tick-todo"
        checked={isTodoCompleted(todo)}
        onChange={e => updateTodoStatus(e, todo.id)}
      />
      {isEdit ? (
        <TodoInput
          data-testid="edit-todo"
          value={content}
          onChange={onChange}
          onKeyDown={onSubmit}
          ref={refCallback}
        />
      ) : (
        <TodoContent data-testid="content" onDoubleClick={edit}>
          {todo.content}
        </TodoContent>
      )}
      <DeleteButton
        data-testid="btn-delete"
        onClick={e => deleteTodo(e, todo.id)}
      >
        X
      </DeleteButton>
    </StyledTodoItem>
  );
};

export default TodoItem;
