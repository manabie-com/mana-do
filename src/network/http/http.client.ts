import Axios, { AxiosInstance, AxiosResponse } from 'axios';

const MAIN_API: string = 'localhost://5000';

// For protocol need't auth
abstract class HttpClient {
  protected instance: AxiosInstance;

  constructor( baseURL: string = MAIN_API) {
    this.instance = Axios.create({
      baseURL,
    });
    // You can init interceptor here
  }
  private initRespInterceptor () {
    this.instance.interceptors.response.use(
      this.handleResp,
      this.handleErr
    )
  }
  handleResp = ({ data }: AxiosResponse) => {
    return data;
  }
  handleErr = () => {

  }
}

export default HttpClient;

// From Http Client, it is code base for implement http with auth, and http without auth.