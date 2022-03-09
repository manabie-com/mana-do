import axios from 'axios';
import { getKey } from 'utils';

const ins = axios.create({
  baseURL: 'http://localhost:5050',
  timeout: 10000,
});

ins.interceptors.request.use((request) => {
  request.headers.Authorization = getKey('token');

  return request;
});

export default ins;
