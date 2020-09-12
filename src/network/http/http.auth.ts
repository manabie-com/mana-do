import { AxiosRequestConfig } from 'axios';
import HttpClient from './http.client';

class HttpAuth extends HttpClient {
  constructor() {
    super();
    this.initRequestInterceptor();
  }

  initRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this.handleRequest
    )
  }
  handleRequest = (config: AxiosRequestConfig) => {
    config.headers['Authorization'] = 'XXX';
    return config;
  }
}

export default HttpAuth;