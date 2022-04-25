import React from 'react';

import { useLanguageContext } from '../../hook/useLanguageContext';
import { TodoFilter, TodoStatus } from '../../models/todo';
import { EnhanceTodoStatus } from '../../ToDoPage';

interface ITodoTabs {
  showing: EnhanceTodoStatus;
  setShowing: React.Dispatch<React.SetStateAction<EnhanceTodoStatus>>;
  todos: any[];
}
const TodoTabs: React.FC<ITodoTabs> = ({ showing, setShowing, todos }) => {
  const { dataLanguage, selectLanguage } = useLanguageContext();
  const language = dataLanguage[selectLanguage];
  return (
    <div className="Todo__tabs">
      <button
        className={`Action__btn ${showing === TodoFilter.ALL && "active"}`}
        onClick={() => setShowing(TodoFilter.ALL)}
      >
        {language.filterAll} ({todos.length})
      </button>
      <button
        className={`Action__btn ${showing === TodoStatus.ACTIVE && "active"}`}
        onClick={() => setShowing(TodoStatus.ACTIVE)}
      >
        {language.active} (
        {todos.filter((todo) => todo.status === TodoStatus.ACTIVE).length})
      </button>
      <button
        className={`Action__btn ${
          showing === TodoStatus.COMPLETED && "active"
        }`}
        onClick={() => setShowing(TodoStatus.COMPLETED)}
      >
        {language.completed} (
        {todos.filter((todo) => todo.status === TodoStatus.COMPLETED).length})
      </button>
    </div>
  );
};

export default TodoTabs;
