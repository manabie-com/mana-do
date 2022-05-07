import shortid from 'shortid';
import { TodoStatus } from '../models/todo';
import reducer, {initialState} from '../store/reducer';

import {
    deleteTodo
} from '../store/actions';

test('Remove a todo in todos', () => {

    var state = initialState;

    var newTodo = {
        content: 'TEST',
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: "firstUser",
    }

    state = {...state, todos: [newTodo]}

    expect(reducer(state, deleteTodo(newTodo.id)))
        .toEqual({...state, todos:[]});
})
