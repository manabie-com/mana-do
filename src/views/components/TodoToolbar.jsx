import React from 'react';



const TodoToolbar = (props) => {
    
    return (
     
            <div className="Todo__toolbar">
                {props.todos.length > 0 ?
                    <input
                        type="checkbox"
                        checked={props.activeTodos === 0}
                        onChange={props.onToggleAllTodoEvent}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <button className="Action__btn" onClick={props.showingAllEvent}>
                        All
                    </button>
                    <button className="Action__btn" onClick={props.showingActiveEvent}>
                        Active
                    </button>
                    <button className="Action__btn" onClick={props.showingCompleteEvent}>
                        Completed
                    </button>
                </div>
                <button className="Action__btn" onClick={props.onDeleteAllTodoEvent}>
                    Clear all todos
                </button>
            </div>
    );
};

export default TodoToolbar;