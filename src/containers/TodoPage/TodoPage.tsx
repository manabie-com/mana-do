import React, { useEffect, useReducer, useState } from "react";
import reducer, { initialState } from "../../store/reducer";
import { EnhanceTodoStatus } from "../../models/todo";
import TodoFilter from "../../components/TodoFilter/TodoFilter";
import TodoCreation from "../../components/TodoCreation/TodoCreation";
import TodoToolbar from "../../components/TodoToolbar/TodoToolbar";
import Service from "../../service";
import { setTodos } from "../../store/actions";
import TodoItem from "../../components/TodoItem/TodoItem";
import { ALL } from "../../common/constants";
import "./TodoPage.scss";

const TodoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>(ALL);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  const todoFilter = todos.filter(
    (todo) => showing === ALL || showing === todo.status
  );

  return (
    <div className="Todo__container">
      <TodoFilter todos={todos} showing={showing} setShowing={setShowing} />
      <TodoToolbar todos={todoFilter} dispatch={dispatch} />
      <div className="Todo__list">
        {todoFilter.map((todo, index) => {
          return <TodoItem key={index} todo={todo} dispatch={dispatch} />;
        })}
      </div>
      <TodoCreation todos={todoFilter} dispatch={dispatch} />
    </div>
  );
};

export default TodoPage;
