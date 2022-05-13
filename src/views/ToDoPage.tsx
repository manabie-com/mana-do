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
import {
  TodoContainer,
  TodoCreation,
  TodoTabs,
  TodoToolbar,
} from './ToDoPage.style';
import { Button, Checkbox, TodoInput } from '../App.style';

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
    <TodoContainer>
      <TodoCreation>
        <TodoInput
          data-testid="input-todo"
          placeholder="What need to be done?"
          value={input}
          onKeyDown={onCreateTodo}
          onChange={onInputChange}
        />
      </TodoCreation>
      <TodoList
        todos={todos}
        filter={showing}
        deleteTodo={onDeleteTodo}
        updateTodoStatus={onUpdateTodoStatus}
        editTodo={onEditTodo}
      />
      <TodoToolbar>
        {todos.length > 0 ? (
          <Checkbox data-testid="btn-toggle" onChange={onToggleAllTodo} />
        ) : (
          <div />
        )}
        <TodoTabs>
          <Button data-testid="btn-all" onClick={setAllFilter}>
            All
          </Button>
          <Button data-testid="btn-active" onClick={setActiveFilter}>
            Active
          </Button>
          <Button data-testid="btn-complete" onClick={setCompletedFilter}>
            Completed
          </Button>
        </TodoTabs>
        <Button data-testid="btn-clear" onClick={onDeleteAllTodo}>
          Clear all todos
        </Button>
      </TodoToolbar>
    </TodoContainer>
  );
};

export default ToDoPage;
