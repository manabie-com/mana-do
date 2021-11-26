import axios from 'axios';

const ins = axios.create({
    baseURL: 'http://localhost:5050',
    timeout: 10000,
});

ins.interceptors.request.use((request) => {
    // Kiểm tra sự tồn tại của token và request.headers trước khi gán token
    let token = localStorage.getItem('token');
    if (token && request.headers) request.headers.Authorization = token;

    return request;
});

export default ins;
