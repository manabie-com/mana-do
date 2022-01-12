import reducer, { AppState } from './reducer';
import { Todo, TodoStatus } from '../models/todo';

import {
    createTodo,
    deleteTodo,
    updateTodoContent,
  } from './actions';

const initialState: AppState = {
    todos: [],
}

const sampleToDos = [
    {
        id: 'ID-01',
        user_id: 'USERID-01',
        content : 'test string 01',
        status: TodoStatus.ACTIVE,
        created_date: new Date().toISOString(),
        isBeingEdited: false,
    },
    {
        id: 'ID-02',
        user_id: 'USERID-02',
        content : 'test string 02',
        status: TodoStatus.ACTIVE,
        created_date: new Date().toISOString(),
        isBeingEdited: false,
    },
    {
        id: 'ID-03',
        user_id: 'USERID-03',
        content : 'test string 03',
        status: TodoStatus.ACTIVE,
        created_date: new Date().toISOString(),
        isBeingEdited: false,
    },
] as Array<Todo>

describe('ToDoPage Reducer', () => {
    it('Should be able to add an item to the list', ()=>{
        const action = createTodo(sampleToDos[0]);
        const result = reducer(initialState, action);
        expect(result.todos).toHaveLength(1);
        expect(result.todos[0]).toEqual(sampleToDos[0]);
    })

    it('Should add only one item to the list per action', ()=>{
        const action1 = createTodo(sampleToDos[0]);
        let result = reducer(initialState, action1);

        const action2 = createTodo(sampleToDos[1]);
        result = reducer(result, action2);

        const action3 = createTodo(sampleToDos[2]);
        result = reducer(result, action3);
        
        expect(result.todos).toHaveLength(3);
        expect(result.todos[0]).toEqual(sampleToDos[0]);
        expect(result.todos[1]).toEqual(sampleToDos[1]);
        expect(result.todos[2]).toEqual(sampleToDos[2]);
    })

    it('Should be able to delete an item on the list', ()=>{
        const action1 = createTodo(sampleToDos[0]);
        let result = reducer(initialState, action1);

        const action2 = createTodo(sampleToDos[1]);
        result = reducer(result, action2);

        const action3 = createTodo(sampleToDos[2]);
        result = reducer(result, action3);
        
        const action4 = deleteTodo(sampleToDos[1].id);
        result = reducer(result, action4);

        expect(result.todos).toHaveLength(2);
        expect(result.todos[0]).toEqual(sampleToDos[0]);
        expect(result.todos[1]).toEqual(sampleToDos[2]);
    })

    it('Should be able to edit the content of an item', ()=>{
        const action1 = createTodo(sampleToDos[0]);
        let result = reducer(initialState, action1);

        const action2 = createTodo(sampleToDos[1]);
        result = reducer(result, action2);

        const action3 = createTodo(sampleToDos[2]);
        result = reducer(result, action3);
        
        const action4 = updateTodoContent(sampleToDos[1].id, 'Edited List Item');
        result = reducer(result, action4);

        expect(result.todos).toHaveLength(3);
        expect(result.todos[0].content).toEqual(sampleToDos[0].content);
        expect(result.todos[1].content).toBe('Edited List Item');
        expect(result.todos[2].content).toEqual(sampleToDos[2].content);
    })
});