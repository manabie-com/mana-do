import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';

import reducer, { initialState } from '../store/reducer';
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  deleteTodo,
  editTodo,
} from '../store/actions';
import Service from '../service';
import { TodoStatus } from '../models/todo';
import TodoList from '../components/TodoList';

export const ALL = 'ALL';
export type EnhanceTodoStatus = TodoStatus | typeof ALL;

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    [setInput]
  );

  const onCreateTodo = useCallback(
    async (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const resp = await Service.createTodo(input);
        dispatch(createTodo(resp));
        setInput('');
      }
    },
    [dispatch, setInput, input]
  );

  const onUpdateTodoStatus = useCallback(
    async (e: ChangeEvent<HTMLInputElement>, todoId: string) => {
      const { checked } = e.target;
      await Service.updateTodoStatus(todoId, checked);
      dispatch(updateTodoStatus(todoId, checked));
    },
    [dispatch]
  );

  const onDeleteTodo = useCallback(
    async (e: MouseEvent<HTMLButtonElement>, todoId: any) => {
      e.stopPropagation();
      await Service.deleteTodo(todoId);
      dispatch(deleteTodo(todoId));
    },
    [dispatch]
  );

  const onToggleAllTodo = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;
      await Service.toggleAllTodos(checked);
      dispatch(toggleAllTodos(checked));
    },
    [dispatch]
  );

  const onDeleteAllTodo = useCallback(async () => {
    await Service.deleteAllTodos();
    dispatch(deleteAllTodos());
  }, [dispatch]);

  const onEditTodo = useCallback(
    async (id: string, content: string) => {
      await Service.editTodo(id, content);
      dispatch(editTodo(id, content));
    },
    [dispatch]
  );

  const setActiveFilter = useCallback(
    () => setShowing(TodoStatus.ACTIVE),
    [setShowing]
  );

  const setCompletedFilter = useCallback(
    () => setShowing(TodoStatus.COMPLETED),
    [setShowing]
  );

  const setAllFilter = useCallback(() => setShowing(ALL), [setShowing]);

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          className="Todo__input"
          placeholder="What need to be done?"
          value={input}
          onKeyDown={onCreateTodo}
          onChange={onInputChange}
        />
      </div>
      <TodoList
        todos={todos}
        filter={showing}
        deleteTodo={onDeleteTodo}
        updateTodoStatus={onUpdateTodoStatus}
        editTodo={onEditTodo}
      />
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input type="checkbox" onChange={onToggleAllTodo} />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button type="button" className="Action__btn" onClick={setAllFilter}>
            All
          </button>
          <button
            type="button"
            className="Action__btn"
            onClick={setActiveFilter}
          >
            Active
          </button>
          <button
            type="button"
            className="Action__btn"
            onClick={setCompletedFilter}
          >
            Completed
          </button>
        </div>
        <button type="button" className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
