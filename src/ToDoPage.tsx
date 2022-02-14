import React, { useCallback, useEffect, useReducer, useState } from 'react';
import ToDoList from './components/ToDoList';
import { TodoStatus } from './models/todo';
import Service from './service';
import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  setTodos,
  toggleAllTodos,
  updateTodoStatus,
} from './store/actions';
import reducer, { initialState } from './store/reducer';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage: React.FC = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const resp = await Service.createTodo(e.currentTarget.value);
        dispatch(createTodo(resp));
      }
    },
    []
  );

  const onDeleteTodo = useCallback(async (todoId: string) => {
    await Service.deleteTodo(todoId);
    dispatch(deleteTodo(todoId));
  }, []);

  const onUpdateTodoStatus = useCallback(
    async (id: string, completed: boolean) => {
      await Service.updateTodoStatus(id, completed);
      dispatch(updateTodoStatus(id, completed));
    },
    []
  );

  const onToggleAllTodo = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const completed = e.target.checked;
      await Service.updateAllTodoStatus(completed);
      dispatch(toggleAllTodos(completed));
    },
    []
  );

  const onDeleteAllTodo = useCallback(async () => {
    await Service.deleteAllTodos();
    dispatch(deleteAllTodos());
  }, []);

  const showAll = useCallback(() => setShowing('ALL'), []);
  const showActive = useCallback(() => setShowing(TodoStatus.ACTIVE), []);
  const showCompleted = useCallback(() => setShowing(TodoStatus.COMPLETED), []);

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <ToDoList
        showActive={showing === TodoStatus.ACTIVE || showing === 'ALL'}
        showCompleted={showing === TodoStatus.COMPLETED || showing === 'ALL'}
        todos={todos}
        onDeleteTodo={onDeleteTodo}
        onUpdateTodoStatus={onUpdateTodoStatus}
      />
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input type="checkbox" onChange={onToggleAllTodo} />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button className="Action__btn" onClick={showAll}>
            All
          </button>
          <button className="Action__btn" onClick={showActive}>
            Active
          </button>
          <button className="Action__btn" onClick={showCompleted}>
            Completed
          </button>
        </div>
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
