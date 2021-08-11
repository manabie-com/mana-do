// const axios = require('axios');
import { authReducer } from '../../slices/authSlice';
const authActions = {
    onLogout: async (dispatch: any) => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch(
            authReducer.logOut()
        );
    },
    onLogin: async (dispatch: any, userId:string, password:string) => {
        const mockToken = 'testabc.xyz.ahk'
        if (userId === 'firstUser' && password === 'example') {
            dispatch(
                authReducer.setProfile({
                    user: {
                        username: userId
                    },
                    token: mockToken
                })
            );
            localStorage.setItem('token', mockToken);
            localStorage.setItem('user', JSON.stringify( {
                username: userId
            }));
            return {
                status: 200,
                message: 'Login successfully'
            }
        } else {
            return {
                status: 400,
                message: 'User or password incorrect'
            }
        }
    }
}
export default authActions;