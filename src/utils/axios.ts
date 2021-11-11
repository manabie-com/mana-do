import axios from 'axios';
import { LOCAL_STORE } from '../shared/constant';

const ins = axios.create({
    baseURL: 'http://localhost:5050',
    timeout: 10000
})

ins.interceptors.request.use((request) => {
    // Fix error object is type of undefined
    request.headers = {
        Authorization: localStorage.getItem(LOCAL_STORE.TOKEN) as string
    }
    return request
})

export default ins