import { createSlice } from '@reduxjs/toolkit';
import initialState from '../../redux/state/auth';
import reduces from '../reduces/auth';

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: reduces
});


export const authReducer = {
    ...authSlice.actions
}

export default authSlice;

export const authSelector = (state: any) => state.auth;
