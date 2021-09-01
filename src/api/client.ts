import axios from 'axios';
import config from './config';

const client = axios.create({
  baseURL: config.apiURL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
  timeout: 30000
});

client.defaults.headers.post['Content-Type'] = 'application/json';

client.interceptors.request.use(
  request => {
    return request;
  },
  error => Promise.reject(error)
);

client.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error) {
      return Promise.reject(error);
    }
  }
);

export default client;