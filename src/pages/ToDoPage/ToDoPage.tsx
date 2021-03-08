import React from "react";
import "./TodoPage.css";
import TodosListContainer from "../../Containers/todosListContainer";
import TodosToolbarContainer from "../../Containers/todosToolbarContainer";
import TodoCreationContainer from "../../Containers/todoCreationContainer";

const ToDoPage: React.FC = () => {
  return (
    <div className="todo">
      <h1 className="todo__heading">TO-DO LIST</h1>
      <div className="todo__container">
        <TodoCreationContainer />
        <TodosListContainer />

        <TodosToolbarContainer />
      </div>
    </div>
  );
};

export default ToDoPage;
