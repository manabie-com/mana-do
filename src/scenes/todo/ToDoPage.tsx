import React, {useEffect, useReducer, useRef, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import reducer, {initialState} from '../../store/reducer';
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos, updateTodo,
} from '../../store/actions';
import Service from '../../service';
import {Todo, TodoStatus} from '../../models/todo';
import {isTodoCompleted} from '../../utils';
import './ToDoPage.css'
import Checkbox from "../../components/Atoms/Checkbox"
import Button from "../../components/Atoms/Button"
import ToDoList from "../../components/ToDoList"

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = ({history}: RouteComponentProps) => {
  const [{todos}, dispatch] = useReducer(reducer, initialState);
  const [editTodo, setEditTodo] = useState();
  const [loading, setLoading] = useState(false);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);

  const validateBeforeSave = (subject: string | undefined) => {
    return !(!subject || !subject.length);
  }

  const selectTodoForEdit = (todo: Todo) => {
    if (inputRef.current) {
      inputRef.current.value = todo.content
      inputRef.current.focus()
      setEditTodo(todo)
    }
  }

  const onCreateOrUpdateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (loading) {
      return
    }

    if (e.key === 'Enter' && inputRef.current) {
      let {value} = inputRef.current
      try {
        if (!validateBeforeSave(value)) {
          return
        }

        setLoading(true)
        editTodo ? onUpdateTodo(value) : onCreateTodo(value)
        inputRef.current.value = ''
        setLoading(false)
      } catch (error) {
        setLoading(false)
        if (error.response.status === 401) {
          history.push('/')
        }
      }
    }
  }

  const onCreateTodo = async (value: string) => {
    const resp = await Service.createTodo(value);
    dispatch(createTodo(resp))
  }

  const onUpdateTodo = async (value: string) => {
    const resp = await Service.updateTodo({...editTodo, content: value});
    dispatch(updateTodo(resp))
    setEditTodo(undefined)
  }

  const onCancelEdit = () => {
    setEditTodo(undefined)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked))
  }

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
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

  const activeTodos = todos.reduce((accum, todo) => {
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
            onKeyDown={onCreateOrUpdateTodo}
            onBlur={onCancelEdit}
          />
          {editTodo && <span>
            <Button className={`Action__btn ml-2`} text="Cancel" showIcon={false}
                    onClick={onCancelEdit}/>
          </span>
          }
        </div>
        <ToDoList wrapClass="ToDo__list"
                  todos={showTodos}
                  onSelectEditTodo={selectTodoForEdit}
                  dispatch={dispatch}/>
        <div className="Todo__toolbar">
          {todos.length > 0 ?
            <Checkbox checked={activeTodos === 0 && showTodos.length > 0} onChange={onToggleAllTodo}/> : <div/>
          }
          <div className="Todo__tabs">
            <Button className={`Action__btn ${showing === 'ALL' ? 'active' : ''}`} text="All"
                    onClick={() => setShowing('ALL')}/>
            <Button className={`Action__btn ${showing === TodoStatus.ACTIVE ? 'active' : ''}`} text="Active"
                    onClick={() => setShowing(TodoStatus.ACTIVE)}/>
            <Button className={`Action__btn ${showing === TodoStatus.COMPLETED ? 'active' : ''}`} text="Completed"
                    onClick={() => setShowing(TodoStatus.COMPLETED)}/>
          </div>
          <Button className="Action__btn" text="Clear all todos" onClick={onDeleteAllTodo}/>
        </div>
      </div>
    </div>
  );
};

export default ToDoPage;
