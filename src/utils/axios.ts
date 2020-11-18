import axios from 'axios';
import { LOGIN_KEYS } from '../models/auth';

const ins = axios.create({
  baseURL: 'http://localhost:5050',
  timeout: 10000,
});

ins.interceptors.request.use((request) => {
  request.headers.Authorization = localStorage.getItem(LOGIN_KEYS.token);

  return request;
});

export default ins;
