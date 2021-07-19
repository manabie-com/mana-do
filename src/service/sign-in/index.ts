import {ISignInService} from './types';
import {Todo, TodoStatus} from '../../models/todo';
import { ApiResponseType } from '../types';

const mockToken = 'testabc.xyz.ahk'

class SignInService extends ISignInService {

    signIn = async (username: string, password: string): Promise<ApiResponseType<string>> => {
        if (username === 'firstUser' && password === 'example') {
            return Promise.resolve({
                data: mockToken,
                statusCode: 200,
                message: "success"
            })
        }

        return Promise.resolve({
            data: '',
            statusCode: 403,
            message: "Incorrect username/password"
        })
    }

    verifyToken = async(token: string): Promise<ApiResponseType<string>> => {
        if (token === mockToken) {
            return Promise.resolve({
                statusCode: 200,
                data: "",
                message: "Token is verified"
            })
        }

        return Promise.resolve({
            statusCode: 401,
            data: "",
            message: "Token is not valid"
        })
    }
}

export default new SignInService();