import React, {useReducer} from 'react';
import Background from "../Background"
import ToDoItem from "./ToDoItem"
import {deleteTodo, updateTodoStatus} from "../../store/actions"
import reducer, {initialState} from "../../store/reducer"

const ToDoList = ({todos, wrapClass = 'ToDo__list', dispatch}: any) => {
  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(updateTodoStatus(todoId, e.target.checked))
  }

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId))
  }

  return <div className={wrapClass}>
    {(todos || []).map((todo:any, index: number) => {
        return <ToDoItem key={index} todo={todo}
                         onSelect={onUpdateTodoStatus}
                         onDelete={onDeleteTodo}
        />
      })
    }
    {(!todos || !todos.length) && <Background wrapClass="Page__Todo__empty_background"
                                                      url="/assets/background/empty-bg.svg"
                                                      message="It's seem you don't have urgent task today"/>

    }
  </div>;
};

export default ToDoList;
