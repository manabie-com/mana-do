import React from "react";
import { devidedTodos } from "../../utils";
import Context from "../../store";
import "./styles.css";

export const TodosToolBar = () => {
  /**
   * get Store using Context
   */
  const propsContext = React.useContext(Context);
  const {
    state: { todos = [] },
    setActiveAll = () => {},
    setCompletedAll = () => {},
    deleteAllTodos = () => {},
  } = propsContext;

  /**
   * Clean up tools bar if todos empty
   */
  if (Array.isArray(todos) && todos.length === 0) {
    return <React.Fragment />;
  }

  /**
   * show hr todos equal 1
   */
  if (Array.isArray(todos) && todos.length === 1) {
    return <hr style={{ marginTop: "2rem" }} />;
  }

  const { todoActive = [], todoCompleted = [] } = devidedTodos(
    /* function prduces 2 array base on status so we can use this to Check */ todos
  );

  return (
    <div className="toolbar-container">
      <span className="toolbar-container-inputCheck">
        <div>
          {Array.isArray(todoCompleted) && todoCompleted.length !== 0 && (
            <button className="btn-success" onClick={setActiveAll}>
              Active All
            </button>
          )}
          &nbsp; &nbsp; &nbsp;
          {Array.isArray(todoActive) && todoActive.length !== 0 && (
            <button
              className="btn-primay"
              label="Completed"
              onClick={setCompletedAll}
            >
              Completed All
            </button>
          )}
        </div>
      </span>

      <span>
        <button
          className="btn-delete-all"
          label="Clear All Todos"
          onClick={deleteAllTodos}
        >
          Clear All Todos
        </button>
      </span>
    </div>
  );
};

export default TodosToolBar;
