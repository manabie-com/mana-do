import { IAPI, IAPIres } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';
import { User } from '../models/user';
import { Auth } from '../models/auth';
import { MSG_ACCOUNT_CREATED, MSG_ACCOUNT_EXISTS, TABLE_TODO, TABLE_TOKEN, TABLE_USERS } from '../components/constants';

interface token {
    user_id: string,
    token: string
}
const mockTokenTable: token[] = [
    {
        user_id: '1',
        token: 'test1.abc.xyz'
    },
    {
        user_id: '2',
        token: 'test2.abc.xyz'
    },
]

const mockUserTable: User[] = [
    {
        user_id: '1', username: 'firstUser', firstName: 'Thien 1', lastName: 'Nguyen', password: 'example'
    },
    {
        user_id: '2', username: 'secondUser', firstName: 'Thien 2', lastName: 'Nguyen Van', password: 'example'
    },
]

const wait = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

function errorResponse(errNumber: number | string | any): IAPIres {
    var res: IAPIres = { status: 200, message: 'Internal Server Response' };
    switch (errNumber) {
        case 401:
            res = { status: errNumber, message: 'Unauthorized' };
            break;
    }
    return res;
}



class ApiFrontend extends IAPI {

    getUserTable(): User[] {
        var tableUserJSON = localStorage.getItem(TABLE_USERS) || JSON.stringify(mockUserTable);
        return JSON.parse(tableUserJSON) as User[];
    }

    getToken(): token[] {
        var tableUserJSON = localStorage.getItem(TABLE_TOKEN) || JSON.stringify(mockTokenTable);
        return JSON.parse(tableUserJSON) as token[];
    }

    genToken(user_id: string): string {
        var token_table = this.getToken().filter(item => item.user_id !== user_id);
        var newUserToken: token = {
            token: shortid(),
            user_id: user_id
        }
        token_table.push(newUserToken);
        localStorage.setItem(TABLE_TOKEN, JSON.stringify(token_table));
        return newUserToken.token;
    }

    getUserInfo(): User | undefined {
        //THIENNGUYEN: This is usually server's task to check for user
        var token = localStorage.getItem('token') || '';
        const table_token = this.getToken();
        const table_users = this.getUserTable();
        var user_id = table_token.find(item => item.token === token)?.user_id;
        const foundUser = table_users.find((user) => user_id === user.user_id);
        if (!foundUser) return undefined;
        return foundUser;
    }

    async getAuth(): Promise<IAPIres> {
        //THIENNGUYEN: mock of reveiving user Profile information from server
        var token = localStorage.getItem('token') || '';
        await wait(500);
        const User = this.getUserInfo();

        var res: IAPIres;
        if (!User) return Promise.reject(errorResponse(401));
        var auth: Auth = {
            token,
            currentUser: User
        };
        res = { status: 200, data: auth, message: 'valid token' }
        return Promise.resolve(res);
    }

    async signIn(username: string, password: string): Promise<IAPIres> {
        //THIENNGUYEN: Simulate token verifying process
        const user_table = this.getUserTable();
        const foundUser = user_table.find(user => user.username === username && user.password === password);

        await wait(200);        //Stimulate server delay
        var res: IAPIres;
        if (foundUser) {
            const newToken = this.genToken(foundUser.user_id);
            const userAuth: Auth = { currentUser: foundUser, token: newToken };
            localStorage.setItem('token', newToken);
            res = { status: 200, data: userAuth };
            //Save generated token
            const table_token = this.getToken().filter(item=>item.user_id!==foundUser.user_id); //Remove other token
            table_token.push({ user_id: foundUser.user_id, token: newToken } as token)
            localStorage.setItem(TABLE_TOKEN,JSON.stringify(table_token));
            return Promise.resolve(res); //THIENNGUYEN: Simulate server's response
        }
        res = { status: 401, message: 'Unauthorized' };
        return Promise.reject(res); //THIENNGUYEN: Simulate server's response
    }

    async createTodo(content: string): Promise<IAPIres> {
        var res: IAPIres;
        await wait(200);
        try {
            //THIENNGUYEN: Simulate server's token check
            const foundUser = this.getUserInfo();
            if (!foundUser) throw Error("401");
            //Create new todo
            const newTodo = {
                content: content,
                created_date: new Date().toISOString(),
                status: TodoStatus.ACTIVE,
                id: shortid(),
                user_id: foundUser.user_id
            } as Todo
            this.saveTodo(newTodo);
            res = { status: 200, data: newTodo, message: 'Success' };
            return Promise.resolve(res);
        } catch (e) {
            return Promise.reject(errorResponse(e));
        }
    }


    async saveTodo(newTodo: Todo): Promise<IAPIres> {
        var res: IAPIres;
        await wait(200);
        try {
            //THIENNGUYEN: Simulate server's token check
            const foundUser = this.getUserInfo();
            if (!foundUser) throw Error("401");
            var localTodoJSON: string = localStorage.getItem(TABLE_TODO) || "[]";
            var TodoArr: Todo[] = JSON.parse(localTodoJSON) as Todo[];
            TodoArr.push(newTodo);
            localStorage.setItem(TABLE_TODO, JSON.stringify(TodoArr));
            res = { status: 200, data: TodoArr, message: "Success" };
            return Promise.resolve(res)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getTodos(): Promise<IAPIres> {
        var res: IAPIres;
        await wait(200);
        try {
            //THIENNGUYEN: Simulate server's token check
            const foundUser = this.getUserInfo();
            if (!foundUser) throw Error("401");
            //
            var localTodoJSON: string = localStorage.getItem(TABLE_TODO) || "[]";
            var queryTodo: Todo[] = JSON.parse(localTodoJSON) as Todo[]
            var filterTodoByUserId: Todo[] = queryTodo.filter(item => item.user_id === foundUser.user_id);
            res = { status: 200, data: filterTodoByUserId, message: 'success' };
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject(errorResponse(error));
        }

    }

    async updateTodo(todo: Todo): Promise<IAPIres> {
        var res: IAPIres;
        await wait(200);
        try {
            //THIENNGUYEN: Simulate server's token check
            const foundUser = this.getUserInfo();
            if (!foundUser) throw Error("401");
            //
            var localTodoJSON: string = localStorage.getItem(TABLE_TODO) || "[]";
            var queryTodo: Todo[] = JSON.parse(localTodoJSON) as Todo[]
            queryTodo = queryTodo.map(item => (item.user_id === foundUser.user_id && item.id === todo.id) ? todo : item)
            localStorage.setItem(TABLE_TODO, JSON.stringify(queryTodo));
            var filterTodoByUserId: Todo[] = queryTodo.filter(item => item.user_id === foundUser.user_id);
            res = { status: 200, data: filterTodoByUserId, message: 'success' };
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject(errorResponse(error));
        }
    }

    async deleteTodo(todo: Todo): Promise<IAPIres> {
        var res: IAPIres;
        await wait(200);
        try {
            //THIENNGUYEN: Simulate server's token check
            const foundUser = this.getUserInfo();
            if (!foundUser) throw Error("401");
            //
            var localTodoJSON: string = localStorage.getItem(TABLE_TODO) || "[]";
            var queryTodo: Todo[] = JSON.parse(localTodoJSON) as Todo[]
            //Delete todo with id given from the array
            queryTodo = queryTodo.filter(item => (item.user_id !== foundUser.user_id || item.id !== todo.id));
            localStorage.setItem(TABLE_TODO, JSON.stringify(queryTodo));
            var filterTodoByUserId: Todo[] = queryTodo.filter(item => item.user_id === foundUser.user_id);
            res = { status: 200, data: filterTodoByUserId, message: 'success' };
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject(errorResponse(error));
        }
    }

    async updateTodoStatus(todo: Todo, status: TodoStatus): Promise<IAPIres> {
        var res: IAPIres;
        await wait(200);
        try {
            //THIENNGUYEN: Simulate server's token check
            const foundUser = this.getUserInfo();
            if (!foundUser) throw Error("401");
            //
            var localTodoJSON: string = localStorage.getItem(TABLE_TODO) || "[]";
            var queryTodo: Todo[] = JSON.parse(localTodoJSON) as Todo[]
            queryTodo = queryTodo.map(item => (item.user_id === foundUser.user_id && item.id === todo.id) ? { ...todo, status: status } : item)
            localStorage.setItem(TABLE_TODO, JSON.stringify(queryTodo));
            var filterTodoByUserId: Todo[] = queryTodo.filter(item => item.user_id === foundUser.user_id);
            res = { status: 200, data: filterTodoByUserId, message: 'success' };
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject(errorResponse(error));
        }
    }

    async register(user: User): Promise<IAPIres> {

        var res: IAPIres = { status: 200, message: 'ok' };
        await wait(200);
        try {
            const table_users = this.getUserTable();
            if (table_users.some(item => item.username === user.username)) {
                res = { status: 200, message: MSG_ACCOUNT_EXISTS };
                return Promise.resolve(res);
            }
            user.user_id = shortid();
            table_users.push(user)
            localStorage.setItem(TABLE_USERS, JSON.stringify(table_users));
            //Create token
            let newToken = this.genToken(user.user_id);
            const table_token = this.getToken().filter(item=>item.user_id!==user.user_id); //Remove other token
            table_token.push({ user_id: user.user_id, token: newToken } as token)
            localStorage.setItem(TABLE_TOKEN,JSON.stringify(table_token));
            localStorage.setItem('token',newToken);
            //Create auth data
            let userAuth:Auth = {
                currentUser: user,
                token: newToken,
            }

            res = { status: 200, message: MSG_ACCOUNT_CREATED, data: userAuth };
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject(errorResponse(error));
        }
    }

    async clearTodos(): Promise<IAPIres> {
        var res: IAPIres = { status: 200, message: 'ok' };
        await wait(200);
        try {
            //THIENNGUYEN: Simulate server's token check
            const foundUser = this.getUserInfo();
            if (!foundUser) throw Error("401");
            //
            var localTodoJSON: string = localStorage.getItem(TABLE_TODO) || "[]";
            var queryTodo: Todo[] = JSON.parse(localTodoJSON) as Todo[]
            queryTodo = queryTodo.filter(item=>item.user_id !== foundUser.user_id);
            localStorage.setItem(TABLE_TODO, JSON.stringify(queryTodo));
            res = { status: 200, message: 'success' };
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject(errorResponse(error));
        }
    }

}

export default new ApiFrontend();