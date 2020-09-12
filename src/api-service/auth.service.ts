import { HttpClient } from '../network/http';
import { ISignIn } from '../types/auth';


const MOCK_DATA = {
  username: 'HIEU',
  password: 'PASS',
  token: 'token'
};
class AuthService extends HttpClient {
  async signIn (data: ISignIn) {
    const { username, password } = data;
    if (username === MOCK_DATA.username && password === MOCK_DATA.password) {
            return Promise.resolve({ token: MOCK_DATA.token })
        }
        return Promise.reject({ code: 401, msg: 'Incorrect username/password' });
  }
}

export default new AuthService();