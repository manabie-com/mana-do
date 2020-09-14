
import history from './history';

export const handleRequest = async (api: any) => {
    try {
        return await api;
    } catch (e) {
        if (e.response.status === 401) history.push("/");
    }
}