import React, {useRef, useState} from 'react';
import {FaTrash} from "react-icons/fa";

import {findTodoById, findTodoIndexById, updateTodoContent} from '../../utils/todoUtils';
import {GlobalContextType, StateContext} from "../../App";
import {isTodoCompleted} from "../../utils";
import {deleteTodo, updateTodoContent as updateTodoContentAction, updateTodoStatus} from "../../store/actions";
import {getTodosFromStorage} from "../../utils/storeageUtils";

interface TodoListItemsProps {
  id: string;
}

const TodoListItems = ({id}: TodoListItemsProps) => {
  const {state: {todos}, dispatch} = React.useContext<GlobalContextType>(StateContext);
  const [todosValue, setTodosValue] = useState(todos);
  const listRef = useRef(null);
  const todoItemRef = useRef<Array<HTMLInputElement | null>>([]);
  const todo = findTodoById(todos, id) ?? {id: '', user_id: '', content: '', created_date: ''};
  const [toggle, setToggle] = useState({});

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  }

  const onDeleteTodoItem = (todoId: string) => {
    if (listRef && listRef.current) {
      // @ts-ignore
      listRef.current.classList.add('hidden');
    }

    const t = window.setTimeout(() => {
      window.clearTimeout(t);
      dispatch(deleteTodo(todoId));
    }, 300);
  }

  const foundIndex = findTodoIndexById(todosValue, id);

  const onLiveEditKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLTextAreaElement;
    if (event.key === 'Enter' || event.key === 'Escape') {
      if (event.key === 'Escape') {
        setTodosValue(getTodosFromStorage());
      }

      if (event.key === 'Enter') {
        const newTodos = updateTodoContent(todosValue, todo.id, target.value)
        setTodosValue(newTodos);
        dispatch(updateTodoContentAction(todo.id, target.value))
      }

      setToggle((prev) => ({
        ...prev,
        [id]: false
      }));
    }
  }

  const onChangeLiveEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const foundIndex = findTodoIndexById(todos, todo.id);
    let newTodos = [...todos];
    newTodos[foundIndex] = {
      ...newTodos[foundIndex],
      content: value
    }
    setTodosValue(newTodos);
  }

  const onBlurLiveEdit = () => {
    setToggle((prev) => ({
      ...prev,
      [id]: false
    }));
    setTodosValue(getTodosFromStorage());
  }

  return (
    <li ref={listRef} className={`ToDo__item visible ${toggle[id] ? 'border-blue' : ''}`}>
      <input
        type="checkbox"
        checked={isTodoCompleted(todo)}
        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
      />
      <span className="Todo__content_wrap" onDoubleClick={() => {
        setToggle((prev) => ({
          ...prev,
          [id]: true
        }));
        todoItemRef.current[id]?.focus();
      }}>
        <input
          style={{left: toggle[id] ? '0' : '-9999px'}}
          type="text"
          className="Todo__content_live_edit"
          value={todosValue[foundIndex].content}
          ref={el => todoItemRef.current[id] = el}
          onChange={onChangeLiveEdit}
          onBlur={onBlurLiveEdit}
          onKeyDown={onLiveEditKeydown}
        />
        <span
          style={{display: toggle[id] ? 'none' : 'inline-block'}}>
          {todosValue[foundIndex].content}
        </span>
      </span>
      <button
        className="Todo__delete"
        onClick={() => onDeleteTodoItem(id)}
      >
        <FaTrash/>
      </button>
    </li>
  )
}

export default TodoListItems;
