// Library
import React from 'react';

// Molecules
import {ItemListTodo} from "../../molecules";

// Type
import {Todo, TodoStatus} from "../../../models/todo";

interface ListTodoProps {
    todos: Array<Todo>,
    showing: TodoStatus
    callback: (type:string, value:any) => void
}

export const ListTodo:React.FC<ListTodoProps> = (props) => {
    const {todos,showing,callback} = props;

    const renderItemListTodo = (todo: Todo, index: number) => {
        switch (showing) {
            case TodoStatus.ALL:{
                return  <ItemListTodo callback={callback} todo={todo} index={index} />
            }
            case TodoStatus.IMPORTANT:{
                if(todo.is_important){
                    return  <ItemListTodo callback={callback} todo={todo} index={index} />
                }
                break;
            }
            case todo.status:{
                return  <ItemListTodo callback={callback} todo={todo} index={index} />
            }
        }
    }

    return (
        <div className="todo__list">
            {
                todos.map((todo, index) => {
                    return (
                        <React.Fragment key={index}>
                            {renderItemListTodo(todo, index)}
                        </React.Fragment>
                    );
                })
            }
        </div>

    )
}