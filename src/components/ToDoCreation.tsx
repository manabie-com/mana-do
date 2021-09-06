import React, {useRef, useState} from 'react';
import classNames from 'classnames';

import {AppActions} from '../store/actions'
import {
  createTodo
} from '../store/actions';
import Service from '../service';
import { useHistory } from 'react-router-dom';

import './ToDoCreation.css';

const ToDoCreation = ({action}: {action: (actionC: AppActions) => void}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showRequire, setShowRequire] = useState(false)
  const history = useHistory();

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      try {
        if(inputRef.current.value) {
          const resp = await Service.createTodo(inputRef.current.value);
          await action(createTodo(resp));
          inputRef.current.value = '';
        } else {
          setShowRequire(true)
        }
      } catch (e) {
          if (e.response.status === 401) {
            history.push('/')
          }
      }
    }
  }
  const onChangeInput = (e: React.ChangeEvent) => {
    if(inputRef.current&&inputRef.current.value.length) {
      setShowRequire(false)
    } else {
      setShowRequire(true)
    }
  }
  const inputClass = classNames(
    'Todo__input',
    {
      'Todo__input--required': showRequire
    }
  )
  return (
    <div className="Todo__creation">
        <input
            aria-label="creation-input"
            ref={inputRef}
            className={inputClass}
            placeholder="What need to be done?"
            onKeyDown={onCreateTodo}
            onChange={onChangeInput}
        />
    </div>
  )
}

export default ToDoCreation