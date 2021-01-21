import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { Todo } from "../models/todo";
import { isTodoCompleted } from "../utils";
import Service from "../service";
interface Props {
  todo: Todo;
  onUpdateTodoStatus: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  onUpdateTodoContent: (id: string, content: string) => void;
  onDeleteTodo: (id: string) => void;
}
const ToDoItem: React.FC<Props> = ({
  todo,
  onUpdateTodoStatus,
  onUpdateTodoContent,
  onDeleteTodo,
}) => {
  const [isEditable, setEditable] = useState<boolean>(false);
  const [todoContent, setTodoContent] = useState<string>(todo.content);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFetching = useRef<boolean>(false);

  const updateTodo = useCallback(
    async (id: string, newTodo: Todo) => {
      if (isFetching.current) {
        return;
      }
      try {
        isFetching.current = true;
        await Service.updateTodo(id, newTodo);
      } catch (error) {
      } finally {
        isFetching.current = false;
        setEditable(false);
        onUpdateTodoContent(id, newTodo.content);
      }
    },
    [onUpdateTodoContent]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputRef.current) {
        const newTodo: Todo = {
          ...todo,
          content: todoContent,
        };
        updateTodo(todo.id, newTodo);
      }
    },
    [todo, todoContent, updateTodo]
  );

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.target.value);
  }, []);

  const clickHandler = useCallback(
    (e: MouseEvent) => {
      if (e.target !== inputRef.current) {
        window.removeEventListener("click", clickHandler);
        const newTodo: Todo = {
          ...todo,
          content: todoContent,
        };
        updateTodo(todo.id, newTodo);
      }
    },
    [todo, todoContent, updateTodo]
  );

  useEffect(() => {
    if (isEditable) {
      window.addEventListener("click", clickHandler);
      inputRef.current && inputRef.current.focus();
    }
  }, [isEditable, clickHandler]);

  return (
    <div className="ToDo__item">
      <input
        className="ToDo__state"
        type="checkbox"
        checked={isTodoCompleted(todo)}
        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
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

      <div className="ToDo__text" onDoubleClick={() => setEditable(true)}>
        {isEditable ? (
          <input
            className="ToDo__input-box"
            value={todoContent}
            onKeyDown={onKeyDown}
            onChange={onChange}
            ref={inputRef}
          />
        ) : (
          <span className="ToDo__content">{todo.content}</span>
        )}
      </div>
      <button className="Todo__delete" onClick={() => onDeleteTodo(todo.id)}>
        X
      </button>
    </div>
  );
};

export default ToDoItem;
