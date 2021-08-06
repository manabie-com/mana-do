import * as actions from '../../store/authActions'
import authReducer from '../../store/authReducer'

describe('reducer login', () => {
    it('should return state access token when login success', () => {
        const state = authReducer(undefined,{
            type: actions.LOGIN_SUCCESS,
            payload:null
        });
        expect(state.ACCESS_TOKEN).toEqual(true);
    })
    it('should return state access token when login false', () => {
        const state = authReducer(undefined,{
            type: actions.LOGIN_FAIL,
            payload:null
        });
        expect(state.ACCESS_TOKEN).toEqual(false);
    })
})