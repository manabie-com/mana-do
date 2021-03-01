import {IAPI} from './types';
import {Todo} from '../models/todo';
import axios from '../utils/axios';
import {AxiosResponse} from 'axios';
import { create } from 'domain';
import { numberPadLeft } from '../utils';
import { UnauthorizedError } from '../models/exception';

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if(error.response.status == 401) {
        return Promise.reject(new UnauthorizedError())
    }
    return Promise.reject(error);
  });

class ApiFullstack extends IAPI {
    async signIn(username: string, password: string): Promise<string> {
        const resp = await axios.get<AxiosResponse<string>>(`/login?user_id=${username}&password=${password}`);

        return resp.data.data
    }

    async createTodo(content: string): Promise<Todo> {
        const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
            content
        });

        return resp.data.data;
    }

    async getTodos(createdDate?: string): Promise<Array<Todo>> {
        if(!createdDate) {
            const now = new Date();
            createdDate = `${now.getFullYear()}-${numberPadLeft(now.getMonth() + 1, 2, '0')}-${numberPadLeft(now.getDate(), 2, '0')}`
        }
        const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks?created_date=${createdDate}`);

        return resp.data.data;
    }
}


export default new ApiFullstack();