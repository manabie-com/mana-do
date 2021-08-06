import * as actions from '../../store/authActions'

describe('action login',()=>{
    it('should create an action to login success',()=>{
        const expectedAction = {
            type: actions.LOGIN_SUCCESS,
        }
        expect(actions.actLoginSuccess()).toEqual(expectedAction)
    })
})

describe('action login fail',()=>{
    it('should create an action to login fail',()=>{
        const expectedAction = {
            type: actions.LOGIN_FAIL,
        }
        expect(actions.actLoginFail()).toEqual(expectedAction)
    })
})