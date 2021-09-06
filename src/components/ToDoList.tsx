import React, {useEffect, useRef, useState} from 'react';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

import {Todo, TodoStatus} from '../models/todo';
import {AppActions} from '../store/actions'
import {
    deleteTodo,
    updateTodoStatus,
    updateTodo
} from '../store/actions';
import {isTodoCompleted} from '../utils';

import './ToDoList.css';

const ToDoList = ({todos, showing, action}:{todos:Array<Todo>, showing: string, action: (action: AppActions) => void}) => {
  const [editableId, setEditableId] = useState('');
  const inputEditRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      if(inputEditRef.current) {
          inputEditRef.current.focus()
      }
  }, [editableId])

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
  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    action(updateTodoStatus(todoId, e.target.checked))
  }

  const onUpdateTodo = async (e: React.KeyboardEvent<HTMLInputElement>, todoId: string) => {
    if(e.key === 'Enter' && inputEditRef.current) {
        const content = inputEditRef.current.value;
        action(updateTodo({todoId, content}));
        setEditableId('')
    }
  }

  const onEditTodo = async (todoId: string) => {
    setEditableId(todoId)
  }

  const onDeleteTodo = async (todoId: string) => {
    action(deleteTodo(todoId))
  }

  return (
    <div className="ToDo__list">
        <TransitionGroup className="Todo__list__motion">
        {
            showTodos.map((todo, index) => {
                return (
                    <CSSTransition
                        key={index}
                        timeout={{enter: 500+index*500, exit: 300}}
                        classNames="item"
                        style={{"transitionDelay": `${ index * .01 }s` }}
                    >
                        <div className="ToDo__item">
                            <input
                                id={todo.id}
                                type="checkbox"
                                checked={isTodoCompleted(todo)}
                                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                            />
                            <div className="Todo__input-wrapper">
                            {
                                editableId === todo.id ?
                                <input
                                    ref={inputEditRef}
                                    className="Todo__input"
                                    placeholder="Change a new task?"
                                    onKeyDown={(e) => onUpdateTodo(e,todo.id)}
                                    onBlur={() => onEditTodo('')}
                                />
                                :<span onDoubleClick={() => onEditTodo(todo.id)}>{todo.content}</span>
                            }
                            </div>
                            <button
                                className="Todo__delete"
                                onClick={() => onDeleteTodo(todo.id)}
                            >
                                X
                            </button>
                        </div>
                    </CSSTransition>
                );
            })
        }
      </TransitionGroup>
    </div>
  )
}

export default ToDoList