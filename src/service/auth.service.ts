import AuthAPI from '../api-service/auth.service';
import { ISignIn } from '../types/auth';
import { setCookie } from '../utils/cookies';

class AuthService {
  async signIn(data: ISignIn, cb?: Function) {
    const { token } = await AuthAPI.signIn(data);
    setCookie('token', token);
    if (cb) {
      cb();
    }
    return { token };
  }
}

export default new AuthService();