import axios from 'axios'
import { store } from "src/redux"

const client = axios.create({
    baseURL: 'http://localhost:5050',
    timeout: 10000
})

client.interceptors.request.use((request) => {
    request.headers.Authorization = store.getState()?.auth?.token
    return request
})

export default client