/**
 * Current Problems
 *  + Coding:
 *      -  TodoPage component is a huge code block, all elements is in this component make it hard to read, maintain
 *      -  All function in this component will be re-create every it re-render, it's unnecessary, in few case it could make other component use these function re-render even their props or state is not change.
 *      -  Others: Binding `index` of list (0,1,2,3) to key of element in list is not good. It has unexpected errors in some case
 *  + Logic:
 *      -  When added new task, it created two duplicate task, seem they have same key so when check to input or click into delete button they are in same action (more detail in `reducer.ts` issue_01)
 * Changed:
 *  + Component Structure
 *      - Tabs: Display tabs, It is status of todo (All/Active/Completed)
 *          --TodoList: Display list todo
 *            --TodoListItem: Display each item in list, every action in this component will take function passed from parent component to excute
 */
import React, {
  useEffect,
  useReducer,
  useRef,
  useState,
  useCallback,
} from "react";
import { RouteComponentProps } from "react-router-dom";

import reducer, { initialState } from "../store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodo,
} from "../store/actions";
import Service from "../service";
import { TodoStatus } from "../models/todo";
import ToDoList from "../components/TodoList";
import Tabs from "../components/Tabs";
import "../styles/todoAfter.scss";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoAfter = ({ history }: RouteComponentProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [activeKey, setActiveKey] = useState<EnhanceTodoStatus>("ALL");
  const [pannels] = useState([
    { key: "ALL", title: "All" },
    { key: TodoStatus.ACTIVE, title: "Active" },
    { key: TodoStatus.COMPLETED, title: "Completed" },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Handler delete item in list
   * @description Trigger when user click delete button (x button)
   */
  const handleDeleteTodo = useCallback((id: string) => {
    dispatch(deleteTodo(id));
  }, []);
  /**
   * Handler update item status in list
   * @description Trigger when user click checkbox input
   */
  const handleUpdateTodo = useCallback(async ({ key, name, value }) => {
    try {
      const resp = await Service.updateTodo(key, name, value);
      console.log(resp);
      if (resp.id) {
        dispatch(updateTodo(resp));
      } else {
        // Nofify error update todo
      }
    } catch (e) {
      // Nofify error update todo
    }
  }, []);

  /**
   * Handler delete all item in list
   * @description Trigger when user click `Clear All` button
   */
  const handleDeleteAllTodo = useCallback(async () => {
    await Service.deleteAllTodo();
    dispatch(deleteAllTodos());
  }, []);

  /**
   * Handler create new item
   * @description Trigger when user press enter button
   */
  const handleCreateTodo = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputRef.current && inputRef.current.value) {
        if (inputRef.current.value.trim().length === 0)
          return;
        try {
          const resp = await Service.createTodo(inputRef.current.value);
          dispatch(createTodo(resp));
          inputRef.current.value = "";
        } catch (e) {
          if (e.response.status === 401) {
            history.push("/");
          }
        }
      }
    },
    [history]
  );

  /**
   * Handler toggle all item in list
   * @description Trigger when user click `Mark/Unmark All` button
   */
  const handleToggleAllTodo = useCallback(() => {
    dispatch(toggleAllTodos(!state.toggleAll));
  }, [state.toggleAll]);

  const showTodos = state.todos.filter((todo) => {
    switch (activeKey) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  useEffect(() => {
    const getAllTodo = async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    };
    getAllTodo();
  }, []);

  return (
    <div className="todo__after">
      <h2>AFTER</h2>
      <div className="todo__container">
        <div className="todo__creation">
          <input
            ref={inputRef}
            className="todo__input"
            placeholder="What need to be done?"
            onKeyDown={handleCreateTodo}
          />
        </div>
        <Tabs
          activeKey={activeKey}
          panels={pannels}
          extra={[
            state.todos.length > 0 ? (
              <button
                key="toggle"
                className="todo__btn todo__btn--success"
                onClick={handleToggleAllTodo}
              >
                {state.toggleAll ? "Unmark" : "Mark"} all
              </button>
            ) : null,
            <button
              key="clearAll"
              className="todo__btn todo__btn--danger"
              onClick={handleDeleteAllTodo}
            >
              Clear all
            </button>,
          ]}
          onChange={(activeKey: EnhanceTodoStatus) => setActiveKey(activeKey)}
        >
          <ToDoList
            dataSource={showTodos}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default ToDoAfter;
