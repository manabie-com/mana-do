import React, { useEffect, useState, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {StateInspector, useReducer} from 'reinspect'

import {Todo} from '../../models/todo';

import reducer, { initialState } from '../../store/reducer';
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodo
} from '../../store/actions';
import Service from '../../service';
import { TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';

import './index.css';
import TodoItem from '../../components/TodoItem';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState, (a) => a, 'todosState');
  const [todoInput, setTodoInput] = useState('');
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const [editId, setEditId] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      console.log('RUN', resp);
      dispatch(setTodos(resp || []));
    })();
  }, []);

  const updateEditId = (id: string) => {
    setEditId(id)
  }

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = todoInput.trim();
    if (e.key === 'Enter' && inputValue.length > 0) {
      try {
        const resp = await Service.createTodo(inputValue);
        dispatch(createTodo(resp));

        // const todoo = {
        //   content: 'asd',
        //   user_id: 'user_id',
        //   id: 'fine',
        //   status: 'ACTIVE',
        //   created_date: '2021-01-30T14:40:29.202Z'
        // } as Todo;
        // dispatch(createTodo(todoo));
        
        // Clear todo input
        setTodoInput('');
      } catch (e) {
        if (e.response.status === 401) {
          history.push('/');
        }
      }
    }
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const showTodos = todos
    .filter((todo) => {
      switch (showing) {
        case TodoStatus.ACTIVE:
          return todo.status === TodoStatus.ACTIVE;
        case TodoStatus.COMPLETED:
          return todo.status === TodoStatus.COMPLETED;
        default:
          return true;
      }
    })
    .sort((a, b) => (a.created_date > b.created_date ? -1 : 1)); // sort by recent time order

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const onTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(e.currentTarget.value);
  };

  // const handleEdit = (id: string) => {
  //   // setTodoInput(e.currentTarget.value);
  //   console.log(id);
  //   setEditId(id);
  //   //    dispatch(updateTodo(id, ))
  // };

  return (
    <div className='ToDo__container'>
      <div className='Todo__creation'>
        <input
          ref={inputRef}
          value={todoInput}
          className='Todo__input'
          placeholder='What need to be done?'
          onKeyDown={onCreateTodo}
          onChange={onTodoInput}
        />
      </div>
      <div className='ToDo__list'>
        {showTodos.map((todo) => {
          const {id = '0'} = todo;
          return <TodoItem todo={todo} updateEditId={updateEditId} edit={id === editId}/>;
          //   const { id = '123', content = '' } = todo;
          //   return (
          //     <div key={id} className='ToDo__item'>
          //       <input
          //         type='checkbox'
          //         checked={isTodoCompleted(todo)}
          //         onChange={(e) => onUpdateTodoStatus(e, id)}
          //       />

          //       <input className='Todo__content' value={content} disabled></input>

          //       <div
          //         className='Todo__delete'
          //         onClick={() => dispatch(deleteTodo(id))}
          //       >
          //         <i className='bx bx-x icon'></i>
          //       </div>

          //       <div className='Todo__edit' onClick={() => handleEdit(id)}>
          //         <i className='bx bxs-pencil icon'></i>
          //       </div>
          //     </div>
          //   );
        })}
      </div>
      <div className='Todo__toolbar'>
        {todos.length > 0 ? (
          <input
            type='checkbox'
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          />
        ) : (
          <div />
        )}
        <div className='Todo__tabs'>
          <button className='Action__btn' onClick={() => setShowing('ALL')}>
            All
          </button>
          <button
            className='Action__btn'
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className='Action__btn'
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button className='Action__btn' onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
