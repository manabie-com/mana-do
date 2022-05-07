import shortid from 'shortid';
import { TodoStatus } from '../models/todo';
import reducer, {initialState} from '../store/reducer';

import {
    createTodo,
} from '../store/actions';

test('Create a todo', () => {

    var state = initialState;

    var newTodo = {
        content: 'TEST',
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: "firstUser",
    }

    expect(reducer(state, createTodo(newTodo)))
        .toEqual({...state, todos:[newTodo]});
})
