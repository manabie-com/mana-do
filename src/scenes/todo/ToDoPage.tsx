import React, {useEffect, useReducer, useRef, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import reducer, {initialState} from '../../store/reducer';
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus
} from '../../store/actions';
import Service from '../../service';
import {TodoStatus} from '../../models/todo';
import {isTodoCompleted} from '../../utils';
import './ToDoPage.css'
import Checkbox from "../../components/Atoms/Checkbox"
import Button from "../../components/Atoms/Button"
import Background from "../../components/Background"
import ToDoItem from "../../components/ToDoItem"
import Input from "../../components/Atoms/Input"

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = ({history}: RouteComponentProps) => {
  const [{todos}, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })()
  }, [])

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      try {
        const resp = await Service.createTodo(inputRef.current.value);
        dispatch(createTodo(resp));
        inputRef.current.value = '';
      } catch (e) {
        if (e.response.status === 401) {
          history.push('/')
        }
      }
    }
  }

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(updateTodoStatus(todoId, e.target.checked))
  }

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked))
  }

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  }

  const onDeleteTodo = (id: any) => {
    dispatch(deleteTodo(id))
  }

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <div id="Page__ToDo">
      <div className="ToDo__container card">
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
            showTodos.map((todo, index) => {
              return <ToDoItem key={index} todo={todo}
                               onSelect={onUpdateTodoStatus}
                               onDelete={onDeleteTodo}
              />
            })
          }
          {(!showTodos || !showTodos.length) && <Background wrapClass="Page__Todo__empty_background"
                                                            url="/assets/background/empty-bg.svg"
                                                            message="It's seem you don't have urgent task today"/>

          }
        </div>
        <div className="Todo__toolbar">
          {todos.length > 0 ?
            <Checkbox checked={activeTodos === 0} onChange={onToggleAllTodo}/> : <div/>
          }
          <div className="Todo__tabs">
            <Button className="Action__btn" text="All" onClick={() => setShowing('ALL')}/>
            <Button className="Action__btn" text="Active" onClick={() => setShowing(TodoStatus.ACTIVE)}/>
            <Button className="Action__btn" text="Completed" onClick={() => setShowing(TodoStatus.COMPLETED)}/>
          </div>
          <Button className="Action__btn" text="Clear all todos" onClick={onDeleteAllTodo}/>
        </div>
      </div>
    </div>
  );
};

export default ToDoPage;
