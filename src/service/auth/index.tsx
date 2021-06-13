import {IAuth} from "./types";

const mockToken = 'testabc.xyz.ahk'

class AuthService extends IAuth {
    async signIn(username: string, password: string): Promise<string> {
        if (username === 'firstUser' && password === 'example') {
            return Promise.resolve(mockToken)
        }

        return Promise.reject('Incorrect username/password')
    }
}

export default new AuthService();