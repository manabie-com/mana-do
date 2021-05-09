import axios from 'axios';

const ins = axios.create({
  baseURL: 'http://localhost:5050',
  timeout: 10000
});

ins.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token;
    return config;
  },
  errors => {
    Promise.reject(errors);
  }
);

ins.interceptors.response.use(
  response => {
    if (response.status === 200) return response.data;
  },
  error => {
    // Network Error
    if (error.message === 'Network Error' && !error.response) {
    }

    const { status } = error.response;
    if (status === 404) {
      // Not found
    }

    if (status === 500) {
      // Status 500
    }

    console.log(error);

    throw error.response;
  }
);

export default ins;
