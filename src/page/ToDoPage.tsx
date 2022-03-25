import { Empty, Input } from "antd";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import TodoAction from "../component/TodoAction";
import TodoProgress from "../component/TodoProgress";
import TodoTask from "../component/TodoTask";
import { TodoStatus } from "../models/todo";
import Service from "../service";
import { createTodo, getAllTodo } from "../store/actions";
import reducer, { initialState } from "../store/reducer";
import { TodoHelpers } from "../utils/helpers";
import "./ToDoPage.css";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [inputTodoValue, setInputTodoValue] = useState("");
  const [totalTask, setTotalTask] = useState(0);
  const [totalCompletedTask, setTotalCompletedTask] = useState(0);

  // get init
  useEffect(() => {
    dispatch(getAllTodo());
  }, []);

  useEffect(() => {
    const taskInStorage = Object.values(TodoHelpers.getCurrentTodoLst());
    const totalCompleted = taskInStorage.filter(
      (t) => t.status === TodoStatus.COMPLETED
    );
    setTotalTask(taskInStorage.length);
    setTotalCompletedTask(totalCompleted.length);
  }, [todos]);

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTodoValue(e.target.value);
  };

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // check enter keyboards event and input blank
    if (e.key === "Enter" && inputTodoValue.trim() !== "") {
      const resp = await Service.createTodo(inputTodoValue);
      dispatch(createTodo(resp));
      // clear input
      setInputTodoValue("");
    }
  };

  const isCompletedAllTask = useMemo(() => {
    const activeTasks = todos.filter((t) => t.status === TodoStatus.ACTIVE);
    if (activeTasks.length > 0) return false;
    return true;
  }, [todos]);

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <Input
          value={inputTodoValue}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
          onChange={onChangeInputValue}
        />
      </div>
      <TodoProgress totalTask={totalTask} totalCompletedTask={totalCompletedTask} />
      <TodoAction
        todoLength={todos.length}
        dispatch={dispatch}
        isCompletedAllTask={isCompletedAllTask}
      />
      <div className="ToDo__list">
        {todos.map((todo, index) => {
          return <TodoTask key={index} todo={todo} dispatch={dispatch} />;
        })}
        {todos.length < 1 && <Empty className="EmptyBox" />}
      </div>
    </div>
  );
};

export default ToDoPage;
