import React from 'react';
import TodoItem from '../TodoItem';


function TodoList({data, onDeleteTodo, onUpdateTodoStatus, onUpdateTodo, onToggleAllTodo, editItem, setEditItem, unCompletedCount} 
  : {data: any, onDeleteTodo: any, onUpdateTodoStatus: any, onUpdateTodo: any, onToggleAllTodo: any, editItem: any, setEditItem: any, unCompletedCount: number}) {

  return (
    <section className="main">
				<input checked={unCompletedCount > 0 ? true : false} id="toggle-all" className="toggle-all" type="checkbox" onChange={(e) => onToggleAllTodo(e)}/>
				<label htmlFor="toggle-all">Mark all as complete</label>  
				<ul className="todo-list">
          {
             data.map((todo: any, index: number) => {
              return (
                <TodoItem key={todo.id} todo={todo} index={index} onUpdateTodoStatus={onUpdateTodoStatus} onUpdateTodo={onUpdateTodo} onDeleteTodo={onDeleteTodo} editItem={editItem} setEditItem={setEditItem}/>
              )})
          }
				</ul>
			</section>
  );
}

export default TodoList;
