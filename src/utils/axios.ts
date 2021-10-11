import axios from "axios";
import { getTokenLocalStorage } from "./storage";

const ins = axios.create({
  baseURL: "http://localhost:5050",
  timeout: 10000,
});

ins.interceptors.request.use((request) => {
  request.headers.Authorization = getTokenLocalStorage();
  return request;
});

export default ins;
