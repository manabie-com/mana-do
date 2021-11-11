import Service from ".";
import { UserLogin } from "../models/todo";
import { LOCAL_STORE } from "../shared/constant";

class UserService {
    async signIn(data: UserLogin): Promise<boolean | string> {
        const response = await Service.signIn(data.userId, data.password)
            .then(res => true)
            .catch(error => error.message);
        return response;
    }

    // should verify token via api after get from localStore
    getToken = (): string | null => localStorage.getItem(LOCAL_STORE.TOKEN);

    resetToken = (): void => localStorage.setItem(LOCAL_STORE.TOKEN, "");
}

export default new UserService();