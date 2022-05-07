import shortid from 'shortid';
import { TodoStatus } from '../models/todo';
import reducer, {initialState} from '../store/reducer';

import {
    deleteAllTodos,
} from '../store/actions';

test('Clear all todo in todos', () => {

    var state = initialState;

    var newTodo = {
        content: 'TEST',
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: "firstUser",
    }

    state = {...state, todos: [newTodo]}

    expect(reducer(state, deleteAllTodos()))
        .toEqual({...state, todos:[]});
})
