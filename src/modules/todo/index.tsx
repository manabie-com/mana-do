import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { addTodo, getTodoList, updateTodoItemStatus, updateTodoItemContent, toggleTodos, deleteTodos, deleteTodo } from './todo.slice';

import "./index.scss";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Todo, TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';

import TodoItem from './components/todo/todo';
import Input from '../../components/common/input/input';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = ({ history }: RouteComponentProps) => {
  const todos = useSelector((state: any) => state.todo.todos);
  const [status, setStatus] = useState<EnhanceTodoStatus>('ALL');
  const [todoContent, setTodoContent] = useState("");

  const [showTodos, setShowTodos] = useState([]);
  const [isAllCompleted, setAllCompleted] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch])

  useEffect(() => {
    const showTodos = todos.filter((todo: any) => {
      switch (status) {
        case TodoStatus.ACTIVE:
          return todo.status === TodoStatus.ACTIVE;
        case TodoStatus.COMPLETED:
          return todo.status === TodoStatus.COMPLETED;
        default:
          return true;
      }
    });
    setShowTodos(showTodos);

    const isAllCompleted = showTodos.every((todo: any) => todo.status === "COMPLETED");
    setAllCompleted(isAllCompleted);
  }, [todos, status]);

  const onCreateTodo = async () => {
    try {
      dispatch(addTodo(todoContent));
      setTodoContent("");
    } catch (e: any) {
      if (e && e.response && e.response.status === 401) {
        history.push('/')
      }
    }
  }

  const onChangeTodoContent = (value: string) => {
    setTodoContent(value);
  }

  const onUpdateTodoStatus = (todoId: string, status: boolean) => {
    dispatch(updateTodoItemStatus(todoId, status))
  }

  const onUpdateTodoContent = (todoId: string, content: string) => {
    dispatch(updateTodoItemContent(todoId, content))
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

  // const activeTodos = useMemo(() => {
  //   console.log('status:', status);
  //   console.log('showTodos:', showTodos);
  //   return showTodos.every((todo: any) => isTodoCompleted(todo.status));
  // }, [showTodos, status])

  const onChangeStatusFilter = (event: any) => {
    if (event && event.target) {
      const value = event.target.value;
      setStatus(value);
    }
  }

  return (
    <div className="ToDo__container">
      <div className="">
        <Input id="content" name="content" label="What need to be done?" type="text" value={todoContent}
          onPressEnter={onCreateTodo}
          onChangeValue={(name, value) => onChangeTodoContent(value)} />
      </div>

      <div className="Todo__toolbar">
        <div className="status-selector">
          <select name="status" id="todo-status" onChange={onChangeStatusFilter}>
            <option value="ALL">All</option>
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>

      <div className="ToDo__list">
        {showTodos && showTodos.length ?
          <div className="ToDo__item">
            <input
              type="checkbox"
              checked={isAllCompleted}
              onChange={onToggleAllTodo} />
            <span>All</span>
          </div> : <div />
        }

        {showTodos ?
          showTodos.map((todo: Todo, index: number) => {
            if (todo) {
              return (
                <TodoItem key={todo.id} content={todo.content} status={isTodoCompleted(todo)} id={todo.id}
                  onChangeStatus={(id: string, status: boolean) => onUpdateTodoStatus(id, status)}
                  onDeleteItem={(id: string) => onDeleteTodoItem(id)} onEditTodoContent={(id, content) => onUpdateTodoContent(id, content)} />
              );
            }
            return null;
          }) : null
        }
      </div>
    </div >
  );
};

export default ToDoPage;