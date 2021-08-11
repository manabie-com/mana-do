import { createSlice} from '@reduxjs/toolkit';
import initialState from '../../redux/state/todo';
import reduces from '../reduces/todo';

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: reduces
});


export const todoReducer = {
    ...todoSlice.actions
}

export default todoSlice;

export const todoSelector = (state: any) => state.todo;
