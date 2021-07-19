import React, { useEffect, useReducer, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import reducer, { initialState } from "../../store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  editTodo,
} from "../../store/actions";
import Service from "../../service";
import { TodoStatus } from "../../models/todo";
import { isTodoCompleted } from "../../utils";
import ToDoContent from "../TodoContent/ToDoContent";
import styles from "./styles.module.css";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");

  const inputRef = useRef<HTMLInputElement>(null);

  //I think it just need dispatch setTodos
  useEffect(() => {
    dispatch(setTodos());
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      try {
        //check input is empty
        if (inputRef.current.value) {
          const resp = await Service.createTodo(inputRef.current.value);
          dispatch(createTodo(resp));
          inputRef.current.value = "";
        }
      } catch (e) {
        if (e.response.status === 401) {
          history.push("/");
        }
      }
    }
  };

  const onEditTodo = (text: string, todoId: string) => {
    dispatch(editTodo(todoId, text));
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  // const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(toggleAllTodos(e.target.checked));
  // };

  const onToggleAllTodo = (checked: boolean) => {
    dispatch(toggleAllTodos(!checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };
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

  const activeTodos:number = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);  

  return (
    <div className={styles.container}>
      <div className={styles.wrapContent}>
        <h1 className={styles.title}>Todo List</h1>
        <br />
        <div className={styles.todoCreation}>
          <input
            ref={inputRef}
            className={styles.todoInput}
            placeholder="What need to be done?"
            onKeyDown={onCreateTodo}
          />
        </div>
        <div className={styles.todoList}>
          {showTodos.map((todo, index) => {
            return (
              <div key={index} className={`${styles.todoItem} ${isTodoCompleted(todo) && styles.isComplete}`}>
                <input
                  type="checkbox"
                  checked={isTodoCompleted(todo)}
                  onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                />
                <p className={styles.todoContent}>
                  <ToDoContent
                    text={todo.content}
                    onSetText={(text: any) => onEditTodo(text, todo.id)}
                    isComplete={isTodoCompleted(todo)}
                  />
                </p>
                <button
                  className={styles.todoDelete}
                  onClick={() => dispatch(deleteTodo(todo.id))}
                >
                  Clear
                </button>
              </div>
            );
          })}
        </div>
        <div className={styles.todoToolbar}>
          {todos.length > 0 ? (
            
            <button
              onClick={()=>onToggleAllTodo(activeTodos===0)}
              className={styles.toggleBtn}
              style={activeTodos!==0?{backgroundColor: 'rgb(15 144 236 / 55%)'}:{backgroundColor: '#30f251c7'}}
            >
              {activeTodos===0?'Activate all':'Complete all'}
            </button>
          ): <div/>}
          <div className={styles.todoTabs}>
            <button className={`${styles.actionBtn} ${showing === 'ALL' && styles.isActiveType}`} onClick={() => setShowing("ALL")}>
              All
            </button>
            <button
              className={`${styles.actionBtn} ${showing === 'ACTIVE' && styles.isActiveType}`} 
              onClick={() => setShowing(TodoStatus.ACTIVE)}
            >
              Active
            </button>
            <button
              className={`${styles.actionBtn} ${showing === 'COMPLETED' && styles.isActiveType}`} 
              onClick={() => setShowing(TodoStatus.COMPLETED)}
            >
              Completed
            </button>
          </div>
          <button className={`${styles.actionbtn} ${styles.deleteAllBtn}`} onClick={onDeleteAllTodo}>
            Clear all todos
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDoPage;
