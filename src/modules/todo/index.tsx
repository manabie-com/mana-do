import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { addTodo, getTodoList, updateTodoItem, toggleTodos, deleteTodos, deleteTodo } from './todo.slice';

import "./index.scss";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Todo, TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';

import TodoItem from './components/todo/todo';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = ({ history }: RouteComponentProps) => {
  const todos = useSelector((state: any) => state.todo.todos);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);

  const [showTodos, setShowTodos] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch])

  useEffect(() => {
    const showTodos = todos.filter((todo: any) => {
      switch (showing) {
        case TodoStatus.ACTIVE:
          return todo.status === TodoStatus.ACTIVE;
        case TodoStatus.COMPLETED:
          return todo.status === TodoStatus.COMPLETED;
        default:
          return true;
      }
    });
    setShowTodos(showTodos);
  }, [todos, showing]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      try {
        const value = inputRef.current.value;
        dispatch(addTodo(value));
        inputRef.current.value = '';
      } catch (e: any) {
        if (e && e.response && e.response.status === 401) {
          history.push('/')
        }
      }
    }
  }

  const onUpdateTodoStatus = (todoId: string, status: boolean) => {
    dispatch(updateTodoItem(todoId, status))
  }

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleTodos(e.target.checked))
  }

  const onDeleteAllTodo = () => {
    dispatch(deleteTodos());
  }

  const onDeleteTodoItem = (id: string) => {
    dispatch(deleteTodo(id));
  }

  const activeTodos = todos.reduce(function (accum: any, todo: any) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      
      <div className="ToDo__list">
        {
          showTodos.map((todo: Todo, index: number) => {
            if (todo) {
              return (
                <TodoItem key={todo.id} content={todo.content} status={isTodoCompleted(todo)} id={todo.id} 
                onChangeStatus={(id: string, status: boolean) => onUpdateTodoStatus(id, status)}
                onDeleteItem={(id: string) => onDeleteTodoItem(id)} />
              );
            }
            return null;
          })
        }
      </div>

      <div className="Todo__toolbar">
        {todos.length > 0 ?
          <input
            type="checkbox"
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          /> : <div />
        }
        <div className="Todo__tabs">
          <button className="Action__btn" onClick={() => setShowing('ALL')}>
            All
          </button>
          <button className="Action__btn" onClick={() => setShowing(TodoStatus.ACTIVE)}>
            Active
          </button>
          <button className="Action__btn" onClick={() => setShowing(TodoStatus.COMPLETED)}>
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