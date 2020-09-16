import { HttpAuth } from '../network/http';
import { ISignIn } from '../types/auth';

const MOCK_DATA = {
  username: 'firstUser',
  password: 'example',
  token: 'token'
};
class AuthAPI extends HttpAuth {
  async signIn (data: ISignIn) {
    const { username, password } = data;
    if (username === MOCK_DATA.username && password === MOCK_DATA.password) {
      // Call API then set it into cookie
      return Promise.resolve({ token: MOCK_DATA.token })
    }
    return Promise.reject({ code: 401, msg: 'Incorrect username/password' });
  }
  verifyToken(): Promise<boolean> {
    try {
      // this.instance.get(API_VERIFY_AUTH_TOKEN); // Call API at here with TOKEN auto assign into header
      return new Promise((resolve) => setTimeout(() => resolve(true), 100));
      // Do some thing
    } catch (error) {
      throw new Error('UN AUTH');
    }
  }
}

export default new AuthAPI();