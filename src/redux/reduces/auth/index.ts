import { Draft } from '@reduxjs/toolkit';
import initialState from '../../state/auth/index';
const reduces = {
    setProfile: (
        state: Draft<typeof initialState>,
        action: any
    ) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
    },
    logOut: (state: Draft<typeof initialState>) => {
        state.user = {};
        state.token = null
    }
}

export default reduces;