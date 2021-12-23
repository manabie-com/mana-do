import { screen, render} from "@testing-library/react"

import { Todo, TodoStatus } from "../../../models/todo";
import TodoItem from "../TodoItem";


let todo: Todo = {
    id: '1',
    user_id: 'user 1',
    content : 'content 1',
    status: TodoStatus.ACTIVE,
    created_date: '2021-12-7'
}


test("Should correctly render", () => { 
    render( 
        <TodoItem todo = {todo}/>
    );
    const todoItem = screen.getAllByTestId('todo-item-content').map(item => item.textContent)
    
    expect(todoItem[0]).toEqual(todo.content)

 

  });
