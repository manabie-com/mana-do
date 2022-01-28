import axios from 'axios';

const ins = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000
})

ins.interceptors.request.use((request)=>{
    request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return request
})

export default ins