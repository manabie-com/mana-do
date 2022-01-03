import { TodoItem, TodoToolbar } from 'components';
import { EnhanceTodoStatus, TodoStatus } from 'models/todo';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import Service from 'service';
import {
  createTodo, deleteAllTodos, deleteTodo, setTodos, toggleAllTodos, updateTodoContent, updateTodoStatus
} from 'store/actions';
import reducer, { initialState } from 'store/reducer';
import { isTodoCompleted } from 'utils';
import './TodoPage.css';
const ToDoPage = () => {
  const [{todos}, dispatch] = useReducer(reducer, initialState)
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL')
  const inputRef = useRef<HTMLInputElement>(null);
  const [editing,setEditing] = useState<string>('')

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  useEffect(()=>{
    (()=>{
      localStorage.setItem('todos',JSON.stringify(todos))
    })()
  },[todos])

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Kiểm tra thuộc tính value có phải chuỗi rỗng hay không
    if (e.key === 'Enter' && inputRef.current?.value) {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
      inputRef.current.value = '';
    }
  };

  const onUpdateTodoStatus = (todoId: string,value:boolean) => {
    dispatch(updateTodoStatus(todoId, value));
  };

  const onToggleAllTodo = (value:boolean) => {
    dispatch(toggleAllTodos(value));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onDeleteTodo = (todoID: string) => {
    dispatch(deleteTodo(todoID));
  };

  const onSetShowing = (option: EnhanceTodoStatus) => {
    setShowing(option);
  };
  const onTodoDoubleClick = (editID: string) => {
    setEditing(editID)
  }
  const onToggleEditTodo = () => {
    if(editing)
      setEditing('')
  }
  const onEditTodoContent = (todoID:string,content:string) => {
    dispatch(updateTodoContent(todoID,content))
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
    <div className='ToDo__container'>
      <div className='Todo__creation'>
        <input
          ref={inputRef}
          className='Todo__input'
          placeholder='What need to be done?'
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className='ToDo__list'>
        {showTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              editing={editing}
              todo={todo}
              onUpdateTodoStatus={onUpdateTodoStatus}
              onDeleteTodo={onDeleteTodo}
              onTodoDoubleClick={onTodoDoubleClick}
              onToggleEditTodo={onToggleEditTodo}
              onEditTodoContent={onEditTodoContent}
            />
          );
        })}
      </div>
      <TodoToolbar
        todoAmount={todos.length}
        activeTodos={activeTodos}
        showing={showing}
        onToggleAllTodo={onToggleAllTodo}
        onDeleteAllTodo={onDeleteAllTodo}
        onSetShowing={onSetShowing}
      />
    </div>
  );
};

export default ToDoPage;
