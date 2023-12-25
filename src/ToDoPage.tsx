import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  deleteTodo,
  updateTodo
} from "./store/actions";
import Service from "./service";
import { TodoStatus } from "./models/todo";

type EnhanceTodoStatus = TodoStatus | "ALL";

const EditContentInput = (props: any) => {
  const  {todo, onEnter, isHidden, onBlur} = props;
  const inputRef = useRef<any>(null);


  const onKeydown = async (e: React.KeyboardEvent<HTMLInputElement>, id: any) => {
    if (e.key === "Enter") {
      onEnter(id, inputRef.current.value)
    }
  };

  return (
    <input
                    type="text"
                    className="Todo__change"
                    defaultValue={todo.content}
                    hidden={isHidden}
                    onKeyDown={(e) => onKeydown(e, todo.id)}
                    ref={inputRef}
                    onBlur={() => onBlur()}
                  />
  )
}

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [selectedTodo, setSelectedTodo] = useState(-1);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
    }
  };

  const onUpdateTodo = async (id: any, content: string) => {
    // ham any update to duoi localstorage
      await Service.updateTodo(id, content);
      // buoc nay update todo tren UI de xem
      dispatch(updateTodo(id, content));
      // la de an cai input di
      setSelectedTodo(-1)
  };

  const getColorByStatus = (status: TodoStatus) => {
    switch (status) {
      case TodoStatus.ACTIVE:
        return "red";
      case TodoStatus.COMPLETED:
        return "blue";
      default:
        return "";
    }
  };

  const updateTodoCompleted = async (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
        // update status xuong local storage
       await Service.updateStatus(todoId, TodoStatus.COMPLETED)
    dispatch(updateTodoStatus(todoId, true));
  }

  const clearAllTodo = async (
  ) => {
        // update status xuong local storage
       await Service.clearAllTodo()
    dispatch(deleteAllTodos());
  }
  
    const clearTodo = async ( 
      todoId: any
    ) => {
      await Service.clearTodo(todoId) 
      dispatch(deleteTodo(todoId))
    }

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onBlurEditTodo = (index:number) => {
    if (index !== selectedTodo) return;

    setSelectedTodo(-1)

  }

  return (
    <div className="ToDo__overlay">
      <div className="ToDo__main">
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
            {todos.map((todo, index) => {
              if (showing !== 'ALL' && showing !== todo.status) return;

              return (
                <div key={index} className="ToDo__item">
                  <input
                    type="checkbox"
                    disabled={todo.status === TodoStatus.COMPLETED}
                    onChange={(e) => updateTodoCompleted(e, todo.id)}
                  />
                  <span
                    hidden={selectedTodo === index}
                    onDoubleClick={() => setSelectedTodo(index)}
                    style={{ color: getColorByStatus(todo.status) }}
                  >
                    {todo.content}
                  </span>
                  <EditContentInput
                  onEnter={onUpdateTodo}
                  todo={todo}
                  isHidden={!(selectedTodo === index)}
                  onBlur={()=> {onBlurEditTodo(index)}}
                   />
                  <button
                    className="Todo__delete"
                    onClick={() => clearTodo(todo.id)}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
          <div className="Todo__toolbar">
            {todos.length > 0 ? (
              <input type="checkbox" onChange={onToggleAllTodo} hidden />
            ) : (
              <div />
            )}
            <div className="Todo__tabs">
              <button
                className="Action__btn"
                onClick={() => setShowing("ALL")}
              >
                All
              </button>
              <button
                className="Action__btn"
                onClick={() => setShowing(TodoStatus.ACTIVE)}
              >
                Active
              </button>
              <button
                className="Action__btn"
                onClick={() => setShowing(TodoStatus.COMPLETED)}
              >
                Completed
              </button>
            </div>
            <button
              className="Action__btn Clear__btn"
              onClick={() => clearAllTodo()}
            >
              Clear all todos
            </button>
          </div>
        </div>
        <div className="image">
          <img
            src="https://images.pexels.com/photos/2481177/pexels-photo-2481177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="computer"
            id="img"
          />
        </div>
      </div>
    </div>
  );
};

export default ToDoPage;
