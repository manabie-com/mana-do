import axios from 'axios';

const ins = axios.create({
    baseURL: "//localhost:8080",
    timeout: 10000
})

ins.interceptors.request.use((request)=>{
    request.headers.Authorization = localStorage.getItem('token')

    return request
})


export default ins